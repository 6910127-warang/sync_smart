#!/usr/bin/env python3
"""
Static file server สำหรับ local dev ของโปรเจกต์นี้ (prototype/ และ app/)
ครอบ http.server.SimpleHTTPRequestHandler มาตรฐาน เพิ่มแค่ header
"Cache-Control: no-store" ในทุก response — เพราะ `py -m http.server` เดิม
ไม่ส่ง cache header ใดๆ ทำให้ browser แคชไฟล์ .js/.html เก่าไว้เงียบๆ
(refresh ธรรมดา หรือแม้แต่ hard refresh บางครั้งก็ไม่พอ) ทำให้เห็นพฤติกรรม
เก่าค้างอยู่หลังแก้โค้ดแล้ว ยังไม่ใช่ build tool/framework — เป็นแค่ stdlib
เพิ่ม header เดียว ยังคงสถาปัตยกรรม static HTML/CSS/JS ล้วนๆ ตามเดิม

ใช้งาน: py .claude/no-cache-server.py <port> --directory <dir>
"""
import argparse
import functools
import http.server


class NoCacheHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("port", type=int)
    parser.add_argument("--directory", default=".")
    args = parser.parse_args()

    handler_class = functools.partial(NoCacheHTTPRequestHandler, directory=args.directory)
    http.server.test(HandlerClass=handler_class, port=args.port)
