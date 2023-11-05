from flask import Flask, request, send_file, jsonify
from PyPDF2 import PdfFileReader
import requests
import io

app = Flask(__name__)

# Function to extract text from a PDF file
def extract_text_from_pdf(pdf_file):
    pdf_text = ''
    with open(pdf_file, 'rb') as pdf_file:
        pdf_reader = PdfFileReader(pdf_file)
        for page in pdf_reader.pages:
            pdf_text += page.extract_text()
    return pdf_text

# Function to translate text using an API
def translate_text_with_api(text, from_lang, to_lang):
    api_url = f"https://langapi.vercel.app/home?from={from_lang}&to={to_lang}&text={text}"
    response = requests.get(api_url)
    if response.status_code == 200:
        translated_text = response.json().get('translated', text)
    else:
        translated_text = text  # Use the original text if the API request fails
    return translated_text

@app.route('/translate-pdf', methods=['POST'])
def translate_pdf():
    if 'pdf' in request.files:
        pdf_file = request.files['pdf']
        text = extract_text_from_pdf(pdf_file)
        from_lang = 'en'  # Change this to your source language
        to_lang = 'gu'  # Change this to your target language
        translated_text = translate_text_with_api(text, from_lang, to_lang)

        # Create a new PDF with translated text (you need to handle this)
        # For demonstration purposes, let's save the translated text to a file
        translated_pdf = io.BytesIO()
        translated_pdf.write(translated_text.encode('utf-8'))
        translated_pdf.seek(0)

        return send_file(translated_pdf, as_attachment=True, download_name='translated.pdf')

    return 'No PDF file received', 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=4200)
