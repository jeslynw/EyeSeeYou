#comment/uncomment functions in main as needed

import bcrypt;

def hash_password(plaintext):
    hash = bcrypt.hashpw(plaintext.encode('utf-8'),bcrypt.gensalt())
    return hash.decode('utf-8')

def check_password(plaintext, hash):
    if bcrypt.checkpw(plaintext.encode('utf-8'), hash.encode('utf-8')):
        print("password is valid and ready for use")
    else:
        print("hash does not match, try hashing again")

# def main():
#     #hash password
#     # hashed = hash_password("wx")
#     # print(hashed)

#     #check password
#     check_password("thuthu", "$2b$12$FtLxoZ4N1fYrWq2uSojTueByM7rbjWrqm4g8OzUZ1lWMfCLs5U1i2")

# main()