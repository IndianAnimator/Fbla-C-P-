import http.server
import socketserver
import os
import webbrowser

PORT = 8000

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print("Serving at port", PORT)
    os.system(f"start http://localhost:{PORT}")
    httpd.serve_forever()