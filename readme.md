# 文件列表工具

这是一个简单的命令行工具，用于列出目录中的文件，支持按不同条件排序。

## 功能特点

- 列出指定目录中的所有文件和文件夹
- 支持按名称、大小或修改时间排序
- 支持反向排序
- 显示文件大小（自动转换为合适的单位）
- 显示最后修改时间

## 使用方法

### 直接运行 Python 脚本

```bash
# 列出当前目录
python file_lister.py

# 列出指定目录
python file_lister.py /path/to/directory

# 按大小排序
python file_lister.py --sort-by size

# 按修改时间排序
python file_lister.py --sort-by modified

# 反向排序
python file_lister.py --sort-by size --reverse
```

### 使用 Docker

```bash
# 构建 Docker 镜像
docker build -t file-lister .

# 运行容器
docker run -v $(pwd):/app file-lister

# 使用参数运行
docker run -v $(pwd):/app file-lister --sort-by size --reverse
```

## 参数说明

- `directory`: 要列出文件的目录路径（可选，默认为当前目录）
- `--sort-by`: 排序方式，可选值：name（默认）、size、modified
- `--reverse`: 反向排序（可选）

## 输出示例

```
目录: .
--------------------------------------------------------------------------------
名称                                     大小        修改时间
--------------------------------------------------------------------------------
[目录] docs                              0.0B        2024-03-20 10:30:15
file_lister.py                          2.5KB       2024-03-20 10:25:30
README.md                               1.2KB       2024-03-20 10:20:45
