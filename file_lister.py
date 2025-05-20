#!/usr/bin/env python3
import argparse
from pathlib import Path
from datetime import datetime
import sys
import json

def get_file_info(file_path):
    """获取文件信息"""
    stat = file_path.stat()
    return {
        'name': file_path.name,
        'size': stat.st_size,
        'modified': datetime.fromtimestamp(stat.st_mtime).strftime('%Y-%m-%d %H:%M:%S'),
        'is_dir': file_path.is_dir()
    }

def list_files(directory='.', sort_by='name', reverse=False):
    """列出目录中的文件"""
    path = Path(directory)
    if not path.exists():
        print(f"错误：目录 '{directory}' 不存在", file=sys.stderr)
        sys.exit(1)

    files = []
    for item in path.iterdir():
        files.append(get_file_info(item))

    # 根据指定条件排序
    if sort_by == 'size':
        files.sort(key=lambda x: x['size'], reverse=reverse)
    elif sort_by == 'modified':
        files.sort(key=lambda x: x['modified'], reverse=reverse)
    else:  # 默认按名称排序
        files.sort(key=lambda x: x['name'], reverse=reverse)

    return files

def format_size(size):
    """格式化文件大小显示"""
    for unit in ['B', 'KB', 'MB', 'GB']:
        if size < 1024:
            return f"{size:.1f}{unit}"
        size /= 1024
    return f"{size:.1f}TB"

def main():
    parser = argparse.ArgumentParser(description='列出目录中的文件')
    parser.add_argument('directory', nargs='?', default='.',
                      help='要列出文件的目录路径（默认为当前目录）')
    parser.add_argument('--sort-by', choices=['name', 'size', 'modified'],
                      default='name', help='排序方式（默认按名称）')
    parser.add_argument('--reverse', action='store_true',
                      help='反向排序')
    
    args = parser.parse_args()
    
    files = list_files(args.directory, args.sort_by, args.reverse)
    
    # 输出JSON格式
    print(json.dumps(files, ensure_ascii=False))

if __name__ == '__main__':
    main() 