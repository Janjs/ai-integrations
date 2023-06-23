import streamlit as st
import pandas as pd
from pdf2image import convert_from_path
import pytesseract
from PyPDF2 import PdfReader
from langchain.agents import create_csv_agent
from langchain.llms import OpenAI
import os
from langchain.document_loaders import TextLoader
from langchain.indexes import VectorstoreIndexCreator

os.environ['OPENAI_API_KEY'] = ""

llm = OpenAI(temperature=0.1)

def pdf_to_text(pdf_path):
  # Step 1: Convert PDF to images
  images = convert_from_path(pdf_path)

  with open('output.txt', 'w') as f:  # Open the text file in write mode
    for i, image in enumerate(images):
        # Save pages as images in the pdf
        image_file = f'page{i}.jpg'
        image.save(image_file, 'JPEG')

        # Step 2: Use OCR to extract text from images
        text = pytesseract.image_to_string(image_file)

        f.write(text + '\n')  # Write the text to the file and add a newline for each page

def load_pdf_data(uploaded_file):
    with open('uploaded_file.pdf', 'wb') as f:
        f.write(uploaded_file.getbuffer())
    pdf = PdfReader('uploaded_file.pdf')
    text = ""
    for page in pdf.pages:
        text += page.extract_text()
    pdf_to_text('uploaded_file.pdf')
    return text

def main():
    st.title("Chat With Your Documents (pdf)")

    file = st.file_uploader("Upload a file", type=["pdf"])

    load_pdf_data(file)

    loader = TextLoader('output.txt')
    index = VectorstoreIndexCreator().from_loaders([loader])

    # do something with the data
    question = st.text_input("Once uploaded, you can chat with your document. Enter your question here:")
    submit_button = st.button('Submit')

    if submit_button:
      response = index.query(question)

      if response:
        st.write(response)


if __name__ == "__main__":
    main()
