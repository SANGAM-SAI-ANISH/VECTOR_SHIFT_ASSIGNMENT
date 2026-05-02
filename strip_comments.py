import os
import re

def remove_comments(content, ext):
    if ext == '.py':
        # Remove single line comments starting with #
        return re.sub(r'(?m)^\s*#.*$', '', content)
    elif ext == '.css':
        # Remove /* ... */ comments
        return re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    elif ext in ['.js', '.jsx']:
        # We need to be careful with URLs like http:// and https:// 
        # and regex literals, but as a quick pass, we can do:
        
        # Remove /* ... */
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
        
        # Remove // ... but not http:// or https://
        lines = content.split('\n')
        new_lines = []
        for line in lines:
            # Simple heuristic: if // is preceded by : (like http://), ignore.
            # A more robust way is to split by // and check if it's part of a string,
            # but for our file set, let's just find // and check the preceding char
            idx = line.find('//')
            while idx != -1:
                # Check if it's part of http:// or https://
                if idx > 0 and line[idx-1] == ':':
                    idx = line.find('//', idx + 2)
                else:
                    line = line[:idx]
                    break
            new_lines.append(line)
        return '\n'.join(new_lines)
    return content

def main():
    root_dirs = ['frontend/src', 'backend']
    for root_dir in root_dirs:
        for subdir, dirs, files in os.walk(root_dir):
            for file in files:
                ext = os.path.splitext(file)[1]
                if ext in ['.js', '.css', '.py']:
                    filepath = os.path.join(subdir, file)
                    with open(filepath, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    new_content = remove_comments(content, ext)
                    
                    # Remove multiple empty lines created by removing comments
                    new_content = re.sub(r'\n\s*\n', '\n\n', new_content)
                    
                    if content != new_content:
                        with open(filepath, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        print(f"Removed comments from {filepath}")

if __name__ == '__main__':
    main()
