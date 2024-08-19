def get_key(file_path, delimiter):
    with open(file_path, 'r') as file:
        for line in file:
            if '=' in line:
                # Split the line by the delimiter and take the part after it
                extracted_string = line.split(delimiter, 1)[1].strip().strip("'")
                return extracted_string