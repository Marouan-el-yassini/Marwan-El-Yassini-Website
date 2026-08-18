import urllib.request
import threading
import sys

files = [
    "mar.jpeg",
    "csharpintro.png",
    "scharpinter.png",
    "pyton%20intro.png",
    "html.png",
    "css.png",
    "introblazor.PNG",
    "firstapp.PNG",
    "todolist.PNG"
]

base_url = "https://raw.githubusercontent.com/Marouan-el-yassini/Marwan-El-Yassini-Website/f10590f/"

def download(file):
    try:
        url = base_url + file
        out_file = file.replace("%20", " ")
        print(f"Downloading {out_file}...")
        urllib.request.urlretrieve(url, out_file)
        print(f"Success: {out_file}")
    except Exception as e:
        print(f"Failed {file}: {e}")

threads = []
for f in files:
    t = threading.Thread(target=download, args=(f,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()

print("All downloads complete.")
