const config = {
    algorithms: {
        kex: [
            'curve25519-sha256',
            'curve25519-sha256@libssh.org',
            'ecdh-sha2-nistp256',
            'ecdh-sha2-nistp384',
            'ecdh-sha2-nistp521',
            'diffie-hellman-group-exchange-sha1',
            'diffie-hellman-group-exchange-sha256',
            'diffie-hellman-group1-sha1',
            'diffie-hellman-group14-sha1',
            'diffie-hellman-group14-sha256',
            'diffie-hellman-group16-sha512',
            'diffie-hellman-group18-sha512'
        ],
        cipher: [
            'aes128-ctr',
            'aes192-ctr',
            'aes256-ctr',
            'aes128-gcm',
            'aes128-gcm@openssh.com',
            'aes256-gcm',
            'aes256-gcm@openssh.com',
            'aes256-cbc',
            'aes192-cbc',
            'aes128-cbc',
            'blowfish-cbc',
            '3des-cbc',
            'arcfour256',
            'arcfour128',
            'arcfour'
        ],
        hmac: [
            'hmac-sha2-256',
            'hmac-sha2-512',
            'hmac-sha1',
            'hmac-md5',
            'hmac-sha2-256-96',
            'hmac-sha2-512-96',
            'hmac-ripemd160',
            'hmac-sha1-96',
            'hmac-md5-96'
        ],
        compress: [
            'none',
            'zlib@openssh.com',
            'zlib'
        ]
    }
}

export { config }