```
                                      _                                       _____             _____  ____    __  __
                 \ \      / /   ___  | |   ___    ___    _ __ ___     ___    |_   _|   ___     |__  / |  _ \  |  \/  |
                  \ \ /\ / /   / _ \ | |  / __|  / _ \  | '_ ` _ \   / _ \     | |    / _ \      / /  | |_) | | |\/| |
                   \ V  V /   |  __/ | | | (__  | (_) | | | | | | | |  __/     | |   | (_) |    / /_  |  __/  | |  | |
                    \_/\_/     \___| |_|  \___|  \___/  |_| |_| |_|  \___|     |_|    \___/    /____| |_|     |_|  |_|
```

<p align="center">
  <img src="./images/logo-removebg-preview.png" alt="ZPM Logo" width="400" height="400">
</p>

**Secure, efficient, and CLI-based password manager.**

## Table of contents

- [Table of contents](#table-of-contents)
- [Problem Statement](#problem-statement)
- [How ZPM Solves This Problem](#how-zpm-solves-this-problem)
- [Conclusion](#conclusion)
- [Features](#features)
  - [Functional Requirements](#functional-requirements)
  - [Non-Functional Requirements](#non-functional-requirements)
- [Installation](#installation)
  - [Clone the Repository](#clone-the-repository)
- [Docs](#docs)
- [Quick Start](#quick-start)
  - [Install Dependencies](#install-dependencies)
- [Running Tests](#running-tests)
- [Development Workflow](#development-workflow)
- [License](#license)

[![NPM Version][npm-version-image]][npm-url]
[![NPM Downloads][npm-downloads-image]][npm-downloads-url]
[![OpenSSF Scorecard Badge][ossf-scorecard-badge]][ossf-scorecard-visualizer]

<!-- start from here to write the docs for zoombie cli -->

## Problem Statement

In the digital age, individuals and organizations rely on numerous online accounts, each requiring secure and unique credentials. However, managing passwords efficiently presents several challenges:

1. **Security Risks of Cloud-Based Solutions**

   - Many password managers store sensitive data in the cloud, exposing users to potential breaches, unauthorized access, and dependency on third-party providers.

2. **Unstructured and Inefficient Storage**

   - Users often store passwords in **unsecured formats** such as plain text files, spreadsheets, or unencrypted CSV exports, making them vulnerable to unauthorized access.

3. **Lack of Quick and Secure Access**

   - Retrieving credentials manually from large CSV files is **slow, unstructured, and inefficient**, especially for users who need a streamlined workflow.

4. **Absence of an Offline, Secure, and Minimalist Solution**
   - Existing solutions are often **bloated** with unnecessary features, require internet connectivity, or involve complex setup processes.

## How ZPM Solves This Problem

In an era where digital security is paramount, managing passwords efficiently remains a critical challenge. **ZPM (Zoombie Password Manager)** provides a streamlined, command-line-driven solution that enhances security, organization, and accessibility. By transforming raw credential data into a structured, encrypted format, ZPM empowers users with seamless password management while prioritizing **privacy, control, and complete local storage**. Unlike cloud-based password managers, ZPM operates **entirely offline**, eliminating external dependencies and reducing exposure to cyber threats. Designed for speed, security, and ease of use, this tool ensures users retain **full ownership of their credentials** in a self-sufficient and robust environment.

## Conclusion

To address these challenges, **ZPM (Zoombie Password Manager)** provides a **local, CLI-based password manager** that:  
✅ Ensures **100% offline** storage, eliminating cloud security risks.  
✅ Converts **CSV exports into structured, encrypted JSON** for better organization and protection.  
✅ Offers **fast and efficient password retrieval** using a simple command-line interface.  
✅ Provides a **lightweight, dependency-free** alternative to complex password managers.

## Features

### Functional Requirements

1. **CSV File Handling**:

   - Ability to read data from a CSV file.
   - Ability to write to json file

2. **User Interface**:

   - Provide a command-line interface (CLI) for user interaction.
   - Use clear prompts and messages to guide users through the application.

3. **Data Validation**:

   - Ensure that all user inputs (like site names and passwords) are validated for format and length.
   - Handle errors gracefully (e.g., invalid CSV format, incorrect credentials).

4. **User Authentication**:

   - Implement a simple authentication mechanism (e.g., a master password) to access the password manager.

5. **Username Uniqueness**

   - Each `username` must be unique within the system.
   - When adding or updating an account, the system checks for existing usernames to prevent duplicates.
   - If a duplicate is detected during an update or add operation, an error message is returned to inform the user.

6. **Password Management**:

   - Allow users to add new passwords (site, username, password) securely.

   - Provide options to retrieve passwords by Domain-Name.

   - Modify an existing account’s password using `domainName` and `username`.
   - Remove a stored account using `domainName` and `username`.

7. **Encryption and Decryption**:

   - Implement strong encryption for storing passwords securely in the Json file.
   - Provide a mechanism to decrypt passwords when retrieving them.

8. **Search Functionality**:

   - Implement a search feature that allows users to quickly find passwords by site.

9. **Password Generation**:

   - Provide a feature to generate secure, random passwords.

10. **Backup and Restore**:

    - Allow users to create backups of their password data and restore from backups.

### Non-Functional Requirements

1. **Security**:

   - Ensure that all sensitive data (passwords) is encrypted before storage.
   - Implement proper error handling to prevent sensitive information from being exposed.

2. **Performance**:

   - The application should efficiently handle the reading and writing of CSV files, especially with a large number of entries.

3. **Documentation**:

   - Provide clear documentation for how to install, run, and use the application.
   - Include comments within the code for clarity and maintainability.

4. **Dependencies**:
   - List any external libraries or modules required for the project (e.g., libraries for encryption and CSV handling).

## Installation

### Clone the Repository

To get started, clone the repository using the following command:

```sh
git clone https://github.com/Abdelrahman122003/zpm.git
```

## Docs

- [Documentation](./documentation.md)

## Quick Start

### Install Dependencies

Before running **ZPM (Zoombie Password Manager)**, ensure you have all required dependencies installed.

```sh
# Navigate to the project directory
cd zpm

# Install dependencies
npm install
```

## Running Tests

To run the test suite, first install the dependencies:

```bash
npm install
```

Then run `npm test`:

```bash
npm test
```

## Development Workflow

## License
