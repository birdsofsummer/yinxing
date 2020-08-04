from PIL import Image
import pytesseract


def test():
    text = pytesseract.image_to_string(Image.open(r'code.jpg'))
    print(text)
