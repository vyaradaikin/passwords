#!/usr/bin/env node

// Function to display help section
function displayHelp() {
  console.log(`
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
  `);
}

// Function to expand a range like "a-z" or "A-Z" into a full set of symbols
function expandRange(range) {
  const [start, end] = range.split('-');
  if (start && end && start.length === 1 && end.length === 1) {
    const startCode = start.charCodeAt(0);
    const endCode = end.charCodeAt(0);
    if (startCode <= endCode) {
      return Array.from({ length: endCode - startCode + 1 }, (_, i) =>
        String.fromCharCode(startCode + i)
      ).join('');
    }
  }
  console.error(`Invalid range: ${range}`);
  process.exit(1);
}

// Function to parse symbols argument
function parseSymbols(input) {
  return input
    .split(',')
    .map((part) => (part.includes('-') ? expandRange(part) : part))
    .join('');
}

// Function to generate a single password
function generatePassword(symbols, count) {
  if (count <= 0) {
    console.error("Symbol count must be greater than 0.");
    process.exit(1);
  }

  let password = "";

  // Ensure at least one symbol from the set is included
  const guaranteedSymbol = symbols[Math.floor(Math.random() * symbols.length)];
  password += guaranteedSymbol;
  count -= 1; // Reduce count since one character is already added

  // Generate the remaining password
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * symbols.length);
    password += symbols[randomIndex];
  }

  // Shuffle the password to randomize the position of the guaranteed symbol
  password = password.split('').sort(() => Math.random() - 0.5).join('');

  return password;
}

// Parse command-line arguments
const args = process.argv.slice(2);

// Check for help flag
if (args.includes('--help') || args.length < 2) {
  displayHelp();
  process.exit(0);
}

const symbolsInput = args[0];
const count = parseInt(args[1], 10);
const numPasswords = args.length > 2 && !args.includes('--silent') && !args.includes('-s') ? parseInt(args[2], 10) : 1;

if (!symbolsInput || isNaN(count) || isNaN(numPasswords) || numPasswords <= 0) {
  console.error("Invalid input. Use --help for usage instructions.");
  process.exit(1);
}

// Check if silent mode is enabled
const silentMode = args.includes('--silent') || args.includes('-s');

const symbols = parseSymbols(symbolsInput);

// Generate and print the passwords
for (let i = 0; i < numPasswords; i++) {
  const password = generatePassword(symbols, count);
  if (silentMode) {
    console.log(password); // Raw output
  } else {
    console.log(`Password ${i + 1}: ${password}`); // Default output with labels
  }
}
