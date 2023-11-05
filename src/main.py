from flask import Flask, request, send_file
from flask_cors import CORS
from gtts import gTTS
import openai
from googletrans import Translator
from deep_translator import GoogleTranslator
import speech_recognition as sr
openai.api_key = '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'

app = Flask(__name__)
CORS(app)

@app.route('/upload', methods=['POST'])
def upload_audio():
    if 'audio' in request.files:
        audio_file = request.files['audio']
        # Process the audio file here (save, analyze, etc.)
        # For example, save the audio file
        audio_file.save('uploaded_audio.wav')

        translator = Translator()
        recognizer = sr.Recognizer() 
        audio_file = 'uploaded_audio.wav'  # Replace with your audio file path
        with sr.AudioFile(audio_file) as source:
            recognizer.adjust_for_ambient_noise(source)  # Adjust for ambient noise if necessary
            audio_data = recognizer.record(source)
            try:
                text = recognizer.recognize_sphinx(audio_data)
                print("Converted Text (using Pocketsphinx): " + text)
            except sr.UnknownValueError:
                print("Pocketsphinx could not understand the audio")
            except sr.RequestError as e:
                print(f"Speech recognition request failed; {e}")

        translated = GoogleTranslator(source='auto', target='gu').translate(text)
        print(translated)
        myobj = gTTS(text=translated, lang='gu' , slow=False)
        myobj.save("translated_audio.mp3")



            # Process the audio file and get the processed file path
            # For demonstration, assume the processed file path is 'processed_audio.wav'

        processed_file_path = 'translated_audio.mp3'
        return send_file(processed_file_path, as_attachment=True)
    else:
        return 'No audio file received', 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
