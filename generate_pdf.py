import os
import time
import base64
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.print_page_options import PrintOptions

def convert_html_to_pdf():
    html_path = os.path.abspath("concept-note.html")
    pdf_path = os.path.abspath("Concept_Note_InnoSphere.pdf")
    
    print(f"Loading {html_path}...")
    chrome_options = Options()
    chrome_options.add_argument("--headless=new")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    driver = webdriver.Chrome(options=chrome_options)
    try:
        driver.get(f"file:///{html_path.replace(os.sep, '/')}")
        # Wait a moment for fonts and layouts to settle
        time.sleep(2)
        
        print_options = PrintOptions()
        print_options.page_ranges = ['1-4']
        print_options.margin_top = 0.39 # inches (~10mm)
        print_options.margin_bottom = 0.39
        print_options.margin_left = 0.47 # inches (~12mm)
        print_options.margin_right = 0.47
        
        pdf_data = driver.print_page(print_options)
        pdf_bytes = base64.b64decode(pdf_data)
        
        with open(pdf_path, "wb") as f:
            f.write(pdf_bytes)
            
        print(f"Successfully generated PDF at {pdf_path} ({len(pdf_bytes)} bytes)")
    finally:
        driver.quit()

if __name__ == "__main__":
    convert_html_to_pdf()
