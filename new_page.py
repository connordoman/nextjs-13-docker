# Created on Tue Sep 26 2023
# Copyright (c) 2023 Connor Doman

"""
Script to create a new page in Next.js 13

This script will create a new page in the app/ directory by:

1. Creating a new folder with the name of the page
2. Creating a new file named 'page.tsx' in the new folder
3. Creating a new file named 'layout.tsx' in the new folder
    - Unless you're creating a subpage, then the most recent precursor layout will apply.


Usage:
    python new_page.py [-s] <page_name> 

    -s: Create a subpage

    <page_name>: The name of the page to create

Example:

    python new_page.py -s about

    This will create a new subpage named 'about' in the app/ directory.

    'page.tsx' will export a default function component named 'AboutPage' that returns a <div> with the text 'About Page'.

"""

import os
import sys
import re
import argparse
from datetime import datetime

# Get the current working directory
cwd = os.getcwd()

# Get the name of the page to create
parser = argparse.ArgumentParser()
parser.add_argument('page_name_snake_case', help='The name of the page to create')
parser.add_argument('-s', '--subpage', help='Create a subpage', action='store_true')
parser.add_argument('-p', '--path', type=str, help='The path after app/ to the page being created', action='store', default='')
args = parser.parse_args()

# Get the name of the page to create
arg_page_name_snake_case = args.page_name_snake_case

# Get subpage status
arg_is_subpage = args.subpage

# Get the path to the page
arg_page_subpath = args.path


PAGE_TSX_TEMPLATE = """
import {{ useState, useEffect }} from 'react';

export default function {0}Page() {{
    return (
        <div>{1}</div>
    )
}}
"""

LAYOUT_TSX_TEMPLATE = """
import {{ useState, useEffect }} from 'react';

export interface {0}LayoutProps {{
    children?: React.ReactNode
}}

export default function {0}Layout({{ children }}: {0}LayoutProps) {{
    return (
        <main className="">{{children}}</main>
    )
}}
"""

def generate_page_template(page_name: str, page_text: str) -> str:
    return PAGE_TSX_TEMPLATE.format(page_name, page_text)


def generate_layout_template(layout_name: str, layout_text: str) -> str:
    return LAYOUT_TSX_TEMPLATE.format(layout_name, layout_text)


def str_title_case(name_parts: str) -> str:
    return ''.join([part.capitalize() for part in name_parts])


def str_camel_case(name_parts: str) -> str:
    return ''.join([part.capitalize() if i != 0 else part for i, part in enumerate(name_parts)])


def str_snake_case(name_parts: str) -> str:
    return '_'.join([part.lower() for part in name_parts])


def str_lower_case(name_parts: str) -> str:
    return ''.join([part.lower() for part in name_parts])


def str_upper_case(name_parts: str) -> str:
    return ''.join([part.upper() for part in name_parts])


def str_kebab_case(name_parts: str) -> str:
    return '-'.join([part.lower() for part in name_parts])


def validate_snakebab_case(name_snakebab_case: str) -> bool:
    """
    Returns True if the name is of the form "name-name-name" or "name_name_name"
    """
    return re.match(r'^[a-z]+([-_][a-z0-9]+)*[a-z]$', name_snakebab_case)


def extract_snakebab_case(name_snakebab_case: str) -> []:
    return re.split('-|_', name_snakebab_case)


def get_name_parts(name_snakebab_case: str) -> []:
    if not validate_snakebab_case(name_snakebab_case):
        print('Invalid page name')
        return False
    
    return extract_snakebab_case(name_snakebab_case)

def create_file_at(file_name: str, file_contents: str, path: str=arg_page_subpath) -> bool:
    """
    Creates a new file at the given path with the given name and contents
    """
    page_directory = os.path.join(cwd, 'app', path)
    file_path = os.path.join(page_directory, file_name)

    if os.path.exists(file_path):
        print(f'File {file_name} already exists')
        return False
    
    os.makedirs(page_directory, exist_ok=True)

    with open(file_path, 'w') as f:
        f.write(file_contents)
        f.write('\n\n')
        return True

def create_page_tsx(name_parts: []) -> bool:
    """
    Echoes a new page.tsx file to the new page directory
    """
    page_name_title = str_title_case(name_parts)
    page_name_kebab = str_kebab_case(name_parts)

    return create_file_at('page.tsx', generate_page_template(page_name_title, page_name_title))


def create_layout_tsx(name_parts: []) -> bool:
    """
    Echoes a new layout.tsx file to the new page directory
    """
    layout_name_title = str_title_case(name_parts)
    layout_name_kebab = str_kebab_case(name_parts)

    return create_file_at('layout.tsx', generate_layout_template(layout_name_title, layout_name_title))


def create_subpage(name_snakebab_case: str) -> bool:
    name_parts = get_name_parts(name_snakebab_case)
    if not name_parts:
        return False
    
    page_success = create_page_tsx(name_parts)
    return page_success


def create_page(name_snakebab_case: str) -> bool:
    name_parts = get_name_parts(name_snakebab_case)
    if not name_parts:
        return False
    
    page_success = create_page_tsx(name_parts)
    layout_success = create_layout_tsx(name_parts)
    return page_success and layout_success


if __name__ == '__main__':
    if arg_is_subpage:
        print('Successfully created new page.tsx') if create_subpage(arg_page_name_snake_case) else print('Failed to create subpage')
    else:
        print('Successfully create new page.tsx, layout.tsx') if create_page(arg_page_name_snake_case) else print('Failed to create page')


