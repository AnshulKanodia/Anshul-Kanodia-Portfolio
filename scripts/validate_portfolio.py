import os
import re
import sys

def validate_html_files(root_dir):
    print("==================================================")
    print("      Portfolio Link & Asset Validation Script    ")
    print("==================================================")
    
    html_pattern = re.compile(r'\.html$')
    # Match href, src, and data attributes
    link_pattern = re.compile(r'(?:href|src|data)="([^"]+)"')
    
    errors = 0
    warnings = 0
    checked_files = 0
    
    for dirpath, _, filenames in os.walk(root_dir):
        # Skip git folders
        if '.git' in dirpath:
            continue
            
        for filename in filenames:
            if not html_pattern.search(filename):
                continue
                
            file_path = os.path.join(dirpath, filename)
            checked_files += 1
            print(f"\nChecking: {os.path.relpath(file_path, root_dir)}")
            
            with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                content = f.read()
                
            matches = link_pattern.findall(content)
            for link in matches:
                # Skip external HTTP/HTTPS links, anchors, mailto links, and virtual Vercel analytics endpoints
                if link.startswith(('http://', 'https://', '#', 'mailto:', 'data:', '/_vercel/')):
                    continue
                
                # Strip parameters/queries like #toolbar=0
                clean_link = link.split('#')[0].split('?')[0]
                if not clean_link:
                    continue
                
                # Decode URL spaces (%20 -> space)
                clean_link = clean_link.replace('%20', ' ')
                
                # Resolve paths relative to the current file, or root-relative
                if clean_link.startswith('/'):
                    target_path = os.path.join(root_dir, clean_link.lstrip('/'))
                else:
                    target_path = os.path.join(dirpath, clean_link)
                
                # Special cases for routing on Vercel (e.g. /resume maps to /resume/index.html)
                if not os.path.exists(target_path):
                    resolved_as_route = False
                    # Check if it maps to a directory containing index.html (standard server routing)
                    if os.path.isdir(target_path):
                        index_check = os.path.join(target_path, 'index.html')
                        if os.path.exists(index_check):
                            resolved_as_route = True
                    
                    if not resolved_as_route:
                        print(f"  [ERROR] Broken reference: '{link}' -> Resolved as: {os.path.relpath(target_path, root_dir)}")
                        errors += 1
                    else:
                        print(f"  [OK] Link (Route): '{link}'")
                else:
                    print(f"  [OK] Asset: '{link}'")
                    
    print("\n==================================================")
    print("               Validation Summary                 ")
    print("==================================================")
    print(f"Files Checked: {checked_files}")
    print(f"Broken Links Found: {errors}")
    print(f"Warnings Found: {warnings}")
    print("==================================================")
    
    if errors > 0:
        return False
    return True

if __name__ == '__main__':
    project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    success = validate_html_files(project_root)
    if not success:
        sys.exit(1)
    sys.exit(0)
