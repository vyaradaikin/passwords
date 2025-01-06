# passwords
Generate passwords with ease of JavaScript.
Requirements:
node
#### Usage
```
Password Generator Script

Usage:
  passwords.js <symbols|ranges> <length> [number_of_passwords] [--silent|-s]

Parameters:
  <symbols|ranges>         A string defining the symbols to use in password generation.
                           You can use individual symbols (e.g., 'abc123!@#') or ranges
                           (e.g., 'a-z', 'A-Z', '0-9'). Multiple parts can be combined with commas.
                           NOTE: Use single quotes ('') around the symbol string to prevent the shell
                           from interpreting special characters like '$' or '!'.

  <length>                 The desired length of each password (must be a positive integer).

  [number_of_passwords]    Optional. The number of passwords to generate. Default is 1.

  --silent, -s             If specified, the script outputs only the raw passwords, without additional text.

Examples:
  Generate a single password of length 12 with symbols:
    ./passwords.js 'a-z,0-9,!@#$' 12

  Generate 3 passwords of length 10 with upper- and lowercase letters:
    ./passwords.js 'A-Z,a-z' 10 3

  Generate a password with only specific symbols:
    ./passwords.js '!@#$%^&*()' 16

  Show this help message:
    ./passwords.js --help
```
