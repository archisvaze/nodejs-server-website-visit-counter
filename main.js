const http = require('http');
const fs = require('fs');
let count = 0;

const server = http.createServer((req, res) => {
    let path = ''
    count += 1;
    if (req.url === '/style.css') {
        count -= 2;
        res.setHeader("Content-Type", "text/css");
        fs.readFile('./views/style.css', (err, data) => {
            if (err) {
                console.log('error', err.message)
                res.write('Server Error' + err.message)
                res.end()
            }
            res.write(data)
            res.end()
        })
    }
    else {
        switch (req.url) {
            case '/contacts':
                path = './views/contacts.html'
                break;
            case '/favicon.ico':
                path = './views/home.html'
                break;
            case '/products':
                path = './views/products.html'
                break;
            case '/':
                path = './views/home.html'
                break;
            case '/home':
                path = './views/home.html'
                break;
            default:
                path = './views/home.html'
                break;
        }
        fs.readFile(path, (err, data) => {
            if (err) {
                console.log('error', err.message)
                res.write('Server Error' + err.message)
                res.end()
            }
            res.write(data)
            res.write(`
            <script>
            document.querySelector(".count").innerHTML = "Website visited: ${count} times";
            </script>
            `)
            res.end()
        })
    }
})

server.listen(8000, 'localhost', () => {
    console.log('Server is listening on 8000')
})
