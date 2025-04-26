import re
import getpass

def check_password_strength(password):
    """
    Evaluates the strength of a password and returns a score and feedback.
    
    Criteria:
    - Length (8+ characters recommended)
    - Contains uppercase letters
    - Contains lowercase letters
    - Contains numbers
    - Contains special characters
    """
    score = 0
    feedback = []
    
    # Check length
    if len(password) < 8:
        feedback.append("Password is too short. Use at least 8 characters.")
    elif len(password) >= 12:
        score += 2
        feedback.append("Good password length!")
    else:
        score += 1
        feedback.append("Password length is acceptable, but could be longer.")
    
    # Check for uppercase letters
    if re.search(r'[A-Z]', password):
        score += 1
        feedback.append("Contains uppercase letters. ✓")
    else:
        feedback.append("Add uppercase letters to strengthen your password.")
    
    # Check for lowercase letters
    if re.search(r'[a-z]', password):
        score += 1
        feedback.append("Contains lowercase letters. ✓")
    else:
        feedback.append("Add lowercase letters to strengthen your password.")
    
    # Check for numbers
    if re.search(r'\d', password):
        score += 1
        feedback.append("Contains numbers. ✓")
    else:
        feedback.append("Add numbers to strengthen your password.")
    
    # Check for special characters
    if re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        score += 1
        feedback.append("Contains special characters. ✓")
    else:
        feedback.append("Add special characters like !@#$% to strengthen your password.")
    
    # Calculate strength category
    if score >= 5:
        strength = "Strong"
    elif score >= 3:
        strength = "Moderate"
    else:
        strength = "Weak"
    
    return {
        "score": score,
        "max_score": 6,
        "strength": strength,
        "feedback": feedback
    }

def main():
    print("=== Password Strength Checker ===")
    print("Enter a password to check its strength:")
    
    # For testing purposes, we'll use input instead of getpass
    # In a real application, you might want to use getpass for security
    password = input("Password: ")
    
    result = check_password_strength(password)
    
    print("\n=== Results ===")
    print(f"Strength: {result['strength']} ({result['score']}/{result['max_score']})")
    print("\nFeedback:")
    for item in result['feedback']:
        print(f"- {item}")
    
    if result['strength'] == "Weak":
        print("\nYour password is weak. Please consider the feedback to improve it.")
    elif result['strength'] == "Moderate":
        print("\nYour password is moderately strong. Consider the feedback to make it stronger.")
    else:
        print("\nYour password is strong. Good job!")

if __name__ == "__main__":
    main()
