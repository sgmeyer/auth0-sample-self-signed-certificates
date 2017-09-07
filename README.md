# Using Self-Sign Certificates

Often times organizations use self sign certificates for TLS in non-production environments.  This sample demonstrates how to configure node's request module to accept self-signed certificates.

## Use Case

An engineer wants to build a custom rule that makes an HTTPS call to a **non-production** system.  The non-production system is using a self signed certificate to save operation costs of this environment.  This environment does not contain production data and is used as a testing or development environment.  As test user's authenticate the rule should be able to talk over TLS allowing the self signed certificate to be trusted (not get certificate errors).

## Setup

To get this rule working we'll need to creat a rule and call it `Check-Terms-Of-Service`.  When the rule editor opens copy the contents of check-terms-of-service.js and hit the save button.

Once the rule has been deployed, you will need to get a copy of the pem's public key as a base64 string:

Let's say we have a file called certificate.pem

```
-----BEGIN CERTIFICATE-----
MIIEQjCCAyqgAwIBAgIJAMCxMLAxCSZAMA0GCSqGSIb3DQEBBQUAMHMxCzAJBgNV
BAYTAlVTMQswCQYDVQQIEwJNTjEPMA0GA1UEBxMGU2F2YWdlMREwDwYDVQQKEwhj
MGRlci5pbzERMA8GA1UEAxMIYzBkZXIuaW8xIDAeBgkqhkiG9w0BCQEWEXNnbWV5
ZXJAZ21haWwuY29tMB4XDTE3MDkwNzE0NTQxOVoXDTI3MDkwNTE0NTQxOVowczEL
MAkGA1UEBhMCVVMxCzAJBgNVBAgTAk1OMQ8wDQYDVQQHEwZTYXZhZ2UxETAPBgNV
BAoTCGMwZGVyLmlvMREwDwYDVQQDEwhjMGRlci5pbzEgMB4GCSqGSIb3DQEJARYR
c2dtZXllckBnbWFpbC5jb20wggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIB
AQC1x8tu1E6vXb5t6w5F3k/H/8TnLmFg1CvBKI7tsO5wxtyORYQDyfT4VrBz7Rko
QOpknp6gZNPARx6TqSRS2wxCx4v6RrG1+UOUHQ4AVzgpe159KbjDkWeXk1DRBONZ
YtS3Q9aiyblEQrtvrYBYKsItPVxxAC6V6ObSnyNXWzQkOjs8I0HSXZ9Bamfae7Hz
2jPYm2meE67/5EVAJRoLEvBDgNmHGhQp3urp7slO8vvQO194lDns7X9bo0U3qSKG
LmyjHD977B2hAU3VEGQwelu6SiVghGd314tcNbr5LoftylG1XjI3v+tZSltrok7Q
HjfgYamcpd8jOObZWoNCnn5LAgMBAAGjgdgwgdUwHQYDVR0OBBYEFBz3c9ybANwG
Lxujol+biG6EbZeUMIGlBgNVHSMEgZ0wgZqAFBz3c9ybANwGLxujol+biG6EbZeU
oXekdTBzMQswCQYDVQQGEwJVUzELMAkGA1UECBMCTU4xDzANBgNVBAcTBlNhdmFn
ZTERMA8GA1UEChMIYzBkZXIuaW8xETAPBgNVBAMTCGMwZGVyLmlvMSAwHgYJKoZI
hvcNAQkBFhFzZ21leWVyQGdtYWlsLmNvbYIJAMCxMLAxCSZAMAwGA1UdEwQFMAMB
Af8wDQYJKoZIhvcNAQEFBQADggEBAJe7PoQNbJltv5Df+4GFjhHDvwPZcNOEDQoF
oo2Lkun1Uueje8OKKLIORSsetaUrVSzkCXK0To4ZUk2B4Iyxj3MS411AzgV3qa5C
yqAZTXNwdOnokgqxqBIqtinYbOMAFWdo4eULd9OVg08ShCG70gSQPGNXi06CXDL6
cZtJ49onxMnOwQQkCMTKjXCh9dOajBAQMwqn1/W+0M2xMhFHW+L+7M2qe80cja9h
nh3VbitoMm2PKuOU0qgG6XPX6hCM5xtqsYoECvYW1nV9NqcTY9w2z0qNusRo8BEX
AirThdBnU6jOMGKC3065VZykkauppW2aCY5QRHRQtZ2hc26bSI8=
-----END CERTIFICATE-----
```

We will extract this as without spaces and without new lines:

```
MIIEQjCCAyqgAwIBAgI...Z2hc26bSI8=
```

Once we have transformed this to the new format you will need to create a Setting on the configuration object.  This is located at the bottom of the Rules page (or the bottom of the DB Action Scripts page).

For this sample we create a setting with key as `ca_certificate` and `MIIEQjCCAyqgAwIBAgI...Z2hc26bSI8=` as the value.  Hit save and you are all set.