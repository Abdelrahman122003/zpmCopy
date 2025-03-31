# **ZPM CLI Documentation**

**Zoombie Password Manager (ZPM)** is a **secure, offline, and CLI-based password manager** designed for fast and efficient credential management. This document explains all available commands and their usage.

## **Commands Overview**

### **1. General Commands**

#### `help [command]`

📌 **Description:** Shows information about a specific command.  
📌 **Usage:**

```sh
zpm help <command>
```

📌 **Example:**

```sh
zpm help add
```

_Shows details about the `add` command._

---

### **2. Setup & Authentication**

#### `init <email>`

📌 **Description:** Initializes ZPM and links it to your email. This is required before using the tool.  
📌 **Usage:**

```sh
zpm init your@email.com
```

#### `auth`

📌 **Description:** Starts the authentication process using **JWT and OTP**.  
📌 **Usage:**

```sh
zpm auth
```

📌 **Note:** This command should be executed before logging in.

#### `login <otp>`

📌 **Description:** Logs in to ZPM using a **One-Time Password (OTP)** received via email.  
📌 **Usage:**

```sh
zpm login 123456
```

📌 **Example:** If you received the OTP `987654`, run:

```sh
zpm login 987654
```

---

### **3. Password & Data Management**

#### `csvToJson <csvFilePath>`

📌 **Description:** Converts a CSV file into a structured JSON format for better password organization.  
📌 **Usage:**

```sh
zpm csvToJson path/to/file.csv
```

📌 **Example:**

```sh
zpm csvToJson passwords.csv
```

_This creates a JSON file with structured password data._

#### `add <domainName> <username> <password>`

📌 **Description:** Adds a new password entry for a specific website or service.  
📌 **Usage:**

```sh
zpm add example user123 mysecurepassword
```

📌 **Example:**

```sh
zpm add github john_doe P@ssw0rd123
```

_This stores the credentials securely._

#### `getPass <domainName>`

📌 **Description:** Retrieves stored passwords for a given domainName.  
📌 **Usage:**

```sh
zpm getPass example
```

📌 **Example:**

```sh
zpm getPass github
```

_Displays the credentials associated with `github`._

### `update <domainName> <username> <newPassword>`

📌 **Description:** Updates the password for a given `domainName` and `username`.  
📌 **Example:**

```sh
zpm update github blackMan yourself
```

_Updates the password for the account associated with `github` and `blackMan`._

---

### `delete <domainName> <username>`

📌 **Description:** Deletes the stored account for a given `domainName` and `username`.  
📌 **Usage:**

```sh
zpm delete example samy
```

📌 **Example:**

```sh
zpm delete facebook hamada
```

_Deletes the account associated with `facebook` and `hamada`._

---

### **4. Encryption & Security**

#### `decryptAll`

📌 **Description:** Decrypts all passwords in the JSON file for retrieval.  
📌 **Usage:**

```sh
zpm decryptAll
```

#### `encryptPass <password>`

📌 **Description:** Encrypts a single password for secure storage.  
📌 **Usage:**

```sh
zpm encryptPass mypassword123
```

📌 **Example:**

```sh
zpm encryptPass Sup3rS3cr3t!
```

_Returns an encrypted version of the password._

#### `decryptPass <encryptedData> <iv>`

📌 **Description:** Decrypts an encrypted password using the given **IV (Initialization Vector)**.  
📌 **Usage:**

```sh
zpm decryptPass <encryptedPassword> <IV>
```

📌 **Example:**

```sh
zpm decryptPass 8sd9f8sdf7sdf9s8df 123456789abcdefg
```

_Returns the original password._

Here's how you can structure your **Backup & Restore** section in your documentation:

---

### **5. Backup & Restore**

#### `zpm backup <path>`

📌 **Description:** Creates a backup of the encrypted password storage file and saves it to the specified directory.  
📌 **Usage:**

```sh
zpm backup /path/to/backup/directory
```

📌 **Example:**

```sh
zpm backup /home/user/backup
```

_Creates a backup of your encrypted password storage in the specified location._

---

#### `zpm restore <backup-file>`

📌 **Description:** Restores the encrypted password storage from a backup file.  
📌 **Usage:**

```sh
zpm restore /path/to/backup.json
```

📌 **Example:**

```sh
zpm restore /home/user/backup/backup_20240301.json
```

_Replaces the current encrypted storage with the specified backup file._

---

## **Final Notes**

- **ZPM operates completely offline**, ensuring full control over your data.
- **Always remember your master credentials for authentication.**

For further assistance, use:

```sh
zpm help
```

---

🚀 **ZPM – Secure. Local. Yours.** 🔐
