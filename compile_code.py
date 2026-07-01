import os
import json

def get_code_files():
    base_dir = "/Users/yousefodeh/Desktop/Datastructure/code"
    files_to_load = {
        "sll": ("int_sll.h", "int_sll.h"),
        "sll_comments": ("int_sll_comments.h", "int_sll_comments.h"),
        "sll_test": ("sll_test.cpp", "sll_test.cpp"),
        "dll": ("dll.h", "dll.h"),
        "dll_comments": ("dll_comments.h", "dll_comments.h"),
        "dll_test": ("dll_test.cpp", "dll_test.cpp"),
        "ordered_dll": ("ordered_dll.h", "ordered_dll.h"),
        "stack_array": ("stack_array.h", "stack_array.h"),
        "stack_dll": ("stack_dll.h", "stack_dll.h"),
        "queue_array": ("queue_array.h", "queue_array.h"),
        "queue_dll": ("queue_dll.h", "queue_dll.h"),
        "stack_queue": ("stack_queue.cpp", "stack_queue.cpp"),
        "bst": ("bst.h", "bst.h"),
        "bst_driver": ("bst.cpp", "bst.cpp"),
        "hash_table": ("hash_table.h", "hash_table.h"),
        "hashing": ("hashing.cpp", "hashing.cpp"),
        "stl": ("STL.cpp", "STL.cpp"),
        "array_list": ("extra-material/ArrayListWithComments.cpp", "ArrayListWithComments.cpp"),
    }
    
    code_db = {}
    for key, (rel_path, display_name) in files_to_load.items():
        full_path = os.path.join(base_dir, rel_path)
        if os.path.exists(full_path):
            with open(full_path, "r", encoding="utf-8") as f:
                content = f.read()
            code_db[key] = {
                "name": display_name,
                "code": content
            }
        else:
            print(f"Warning: File {full_path} not found.")
            
    return code_db

def main():
    code_db = get_code_files()
    js_output = f"const cf = {json.dumps(code_db, indent=2, ensure_ascii=False)};"
    output_path = "/Users/yousefodeh/Desktop/Datastructure/code_data.js"
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(js_output)
    print(f"Successfully compiled {len(code_db)} files to {output_path}")

if __name__ == "__main__":
    main()
