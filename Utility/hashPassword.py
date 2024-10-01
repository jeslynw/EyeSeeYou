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

def main():
    #hash password
    hashed = hash_password("you")
    print(hashed)

    # #check password
    # check_password("you", "$2b$12$s8JBCotREd1RSMwetiZFAOUwNJtjPotfqf53vSrlthoAQKg.aObVS")

main()