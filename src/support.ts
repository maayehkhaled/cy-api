/// <reference types="cypress" />

import { html } from 'common-tags'
import hljs from 'highlight.js'
const pack = require('../package.json')


// shortcuts to a few Lodash methods
const { get, filter, map, uniq } = Cypress._

let firstApiRequest: boolean

let globalDisplayRequest = true

Cypress.on('test:before:run', () => {
    // @ts-ignore
    const apiDisplayRequest = Cypress.config('apiDisplayRequest')
    globalDisplayRequest =
        apiDisplayRequest === undefined ? true : (apiDisplayRequest as boolean)
    firstApiRequest = true
    // @ts-ignore
    const doc: Document = cy.state('document')
    doc.body.innerHTML = ''
})

function initApiOptions(): ApiOptions {
    if (globalDisplayRequest === false) {
        return { displayRequest: false }
    } else {
        return { displayRequest: true }
    }
}

Cypress.Commands.add(
    'api',
    (options: Partial<Cypress.RequestOptions>) => {
        //@ts-ignore
        let name = options.name
        const apiOptions = initApiOptions()
        const hasApiMessages = Cypress.env('API_MESSAGES') === false ? false : true
        let normalizedTypes: string[] = []
        let normalizedNamespaces: string[] = []
        var { container, win, doc } = getContainer()
        const messagesEndpoint = get(
            Cypress.env(),
            'cyApi.messages',
            '/__messages__',
        )

        // first reset any messages on the server
        if (hasApiMessages) {
            cy.request({
                method: 'POST',
                url: messagesEndpoint,
                log: false,
                failOnStatusCode: false, // maybe there is no endpoint with logs
            })
        }

        // should we log the message before a request
        // in case it fails?
        Cypress.log({
            name,
            message: options.url,
            consoleProps() {
                return {
                    request: options,
                }
            },
        })

        let topMargin = '0'
        if (firstApiRequest) {
            container.innerHTML = ''
        }
        if (apiOptions.displayRequest) {
            if (firstApiRequest) {
                // remove existing content from the application frame
                firstApiRequest = false
                container.innerHTML = html`
                    <head>
                        <link
                                rel="stylesheet"
                                href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism-okaidia.min.css">
                        <script
                                src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js"></script>

                        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/components/prism-json.min.js"></script>
                        <script>
                            // Add color coding based on status code
                            const statusCode = document.querySelector('.status-code');
                            const statusText = document.querySelector('.status-text');

                            if (statusCode.textContent.startsWith('2')) {
                                statusCode.classList.add('color-green');
                                statusText.classList.add('color-green');
                            } else if (statusCode.textContent.startsWith('3')) {
                                statusCode.classList.add('color-orange');
                                statusText.classList.add('color-orange');
                            } else if (statusCode.textContent.startsWith('4')) {
                                statusCode.classList.add('color-blue');
                                statusText.classList.add('color-blue');
                            } else if (statusCode.textContent.startsWith('5')) {
                                statusCode.classList.add('color-red');
                                statusText.classList.add('color-red');
                            }
                        </script>
                        <style>

                            .container {
                                padding: 20px;
                            }

                            .url-container {
                                overflow-x: auto;
                                white-space: nowrap;
                                padding: 3px;
                                border-radius: 5px;
                                width: 100%; /* Full width of the container */
                                margin: 0;
                            }

                            .url-container pre {
                                margin: 0;
                            }

                            body {
                                font-family: Arial, sans-serif;
                                display: flex;
                                flex-direction: column;
                                gap: 10px;
                            }

                            .top-section {
                                display: flex;
                                justify-content: space-between;
                                align-items: flex-start;
                                gap: 20px;
                            }

                            .label {
                                font-weight: bold;
                                margin-bottom: 5px;
                            }

                            .status-code {
                                font-weight: bold;
                            }

                            .status-text {
                                font-weight: bold;
                                color: #333;
                            }

                            .url-container {
                                overflow-x: auto;
                                white-space: nowrap;
                            }

                            .section {
                                display: flex;
                                gap: 20px;
                            }

                            .section .block {
                                flex-basis: 50%;
                            }

                            pre {
                                background-color: #282c34;
                                color: #abb2bf;
                                padding: 10px;
                                border-radius: 5px;
                                overflow-x: auto;
                                overflow-y: auto;
                                max-height: 300px;
                                text-align: left; /* Align content to left */
                            }

                            .code-block {
                                margin-bottom: 15px;
                            }

                            code {
                                font-family: 'Courier New', Courier, monospace;
                            }

                            /* Color coding based on status */
                            .status-code.color-green {
                                color: green;
                            }

                            .status-text.color-green {
                                color: green;
                            }

                            .status-code.color-orange {
                                color: orange;
                            }

                            .status-text.color-orange {
                                color: orange;
                            }

                            .status-code.color-blue {
                                color: blue;
                            }

                            .status-text.color-blue {
                                color: blue;
                            }

                            .status-code.color-red {
                                color: red;
                            }

                            .status-text.color-red {
                                color: red;
                            }

                            .method-get {
                                color: #080895;
                            }

                            .method-post {
                                color: green;
                            }

                            .method-put {
                                color: orange;
                            }

                            .method-delete {
                                color: red;
                            }

                            .method-patch {
                                color: purple;
                            }

                            .method-head {
                                color: cyan;
                            }

                            .method-options {
                                color: yellow;
                            }

                            .url-container pre span.method-get {
                                color: blue;
                            }

                            .url-container pre span.method-post {
                                color: green;
                            }

                            .url-container pre span.method-put {
                                color: orange;
                            }

                            .url-container pre span.method-delete {
                                color: red;
                            }

                            .url-container pre span.method-patch {
                                color: purple;
                            }

                            .url-container pre span.method-head {
                                color: cyan;
                            }

                            .url-container pre span.method-options {
                                color: yellow;
                            }
                        </style>
                    </head>
                `
            } else {
                // container.innerHTML += '<br><hr>\n'
                // topMargin = '1em'
            }
        }

        if (apiOptions.displayRequest) {
            container.innerHTML +=
                // should we use custom class and insert class style?
                '<details>\n'+
                `<summary>${options.url}</summary>\n`+
                '<div class="top-section">\n'+
                '<div>\n'+
                '<div class="label">URL</div>\n'+
                '<div class="url-container">\n'+
                `<pre><code class="language-json"><span class="${getMethodColor(options.method)}">${options.method}</span> ${options.url}</code></pre>\n`+
                '</div>\n'+
                '</div>\n'+
                '</div>\n'+

                '<div class="block">\n'+
                '<div class="label"> Headers</div>\n'+
                '<pre class="code-block"><code class="language-json">\n'+
               // @ts-ignore
                formatRequest(options.headers)+
                '</code></pre>\n'+
                '<div class="label"> Body</div>\n'+
                '<pre class="code-block"><code class="language-json">\n'+
                // @ts-ignore
                formatRequest(options.body)+
                '</code></pre>\n'+
                '</div>\n'+
                '</details>\n'

        }

        cy.request({
            ...options,
            log: false,
        })
            .then(
                ({ duration, body, status, headers, requestHeaders, statusText }) => {
                    return printResponse(
                        container,
                        hasApiMessages,
                        messagesEndpoint,
                        normalizedTypes,
                        normalizedNamespaces,
                        apiOptions.displayRequest,
                    ).then(({ messages }) => {
                        return cy.wrap(
                            {
                                messages,
                                duration,
                                body,
                                status,
                                headers,
                                requestHeaders,
                                statusText,
                            },
                            { log: false },
                        )
                    })
                },
            )
            .then(
                ({
                     messages,
                     duration,
                     body,
                     status,
                     headers,
                     requestHeaders,
                     statusText,
                 }) => {
                    // render the response object
                    // TODO render headers?
                    if (apiOptions.displayRequest) {
                        container.innerHTML +=
                            '<details>\n'+
                            `<summary>response</summary>\n`+
                            '   <div class="block">\n'+
                            '   <div class="label"> Headers</div>\n'+
                            ' <pre class="code-block"><code class="language-json">\n'+
                            formatResponseHeaders(headers) +
                            '</code></pre>\n'+
                            ' <div class="label">Response Body</div>\n'+
                            ' <div class="label">Status</div>\n'+
                            `<div><label class="status-code ${getStatusColorClass(status)}">${status}</label> | <span class="status-text ${getStatusColorClass(status)}">${statusText}</span> | Duration: <span class="duration">${duration}</span></div>\n`+
                            ' <pre class="code-block">\n'+
                            formatResponse(body, headers) +
                            '<code class="language-json"></code></pre>\n'+
                            ' </div>\n'+
                            ' </>\n'+
                        '</details>\n'
                    }

                    // log the response
                    Cypress.log({
                        name: 'response',
                        message: JSON.stringify(body, null, 4),
                        consoleProps() {
                            return {
                                type: typeof body,
                                response: body,
                            }
                        },
                    })

                    for (const type of normalizedTypes) {
                        addOnClickFilter(type)
                    }

                    for (const namespace of normalizedNamespaces) {
                        addOnClickFilter(namespace)
                    }

                    win.scrollTo(0, doc.body.scrollHeight)

                    return {
                        messages,
                        // original response information
                        duration,
                        body,
                        status,
                        statusText,
                        headers,
                        requestHeaders,
                    }
                },
            )
    },
)

const printResponse = (
    container: HTMLElement,
    hasApiMessages: boolean,
    messagesEndpoint: string,
    normalizedTypes: string[],
    normalizedNamespaces: string[],
    displayRequest = true,
) => {
    let messages: Message[] = []
    if (hasApiMessages) {
        return cy
            .request({
                url: messagesEndpoint,
                log: false,
                failOnStatusCode: false, // maybe there is no endpoint with logs
            })
            .then((res) => {
                messages = get(res, 'body.messages', [])
                if (messages.length) {
                    const types = uniq(map(messages, 'type')).sort()
                    // types will be like
                    // ['console', 'debug', 'util.debuglog']
                    const namespaces = types.map((type) => {
                        return {
                            type,
                            namespaces: uniq(
                                map(filter(messages, { type }), 'namespace'),
                            ).sort(),
                        }
                    })
                    // namespaces will be like
                    // [
                    //  {type: 'console', namespaces: ['log']},
                    //  {type: 'util.debuglog', namespaces: ['HTTP']}
                    // ]
                    if (displayRequest) {
                        container.innerHTML +=
                            '<hr>\n' +
                            '<div style="text-align: left">\n' +
                            `<b>Server logs by khaled</b>`

                        if (types.length) {
                            for (const type of types) {
                                const normalizedType = normalize(type)
                                normalizedTypes.push(normalizedType)
                                container.innerHTML += `\n<input type="checkbox" id="check-${normalizedType}" checked name="${type}" value="${normalizedType}"> ${type}`
                            }
                            container.innerHTML += '<br/>\n'
                        }
                        if (namespaces.length) {
                            container.innerHTML +=
                                '\n' +
                                namespaces
                                    .map((n) => {
                                        if (!n.namespaces.length) {
                                            return ''
                                        }
                                        return n.namespaces
                                            .map((namespace) => {
                                                const normalizedNamespace = normalize(n.type, namespace)
                                                normalizedNamespaces.push(normalizedNamespace)
                                                return `\n<input type="checkbox" name="${n.type}.${namespace}"
                        id="check-${normalizedNamespace}" checked
                        value="${normalizedNamespace}"> ${n.type}.${namespace}`
                                            })
                                            .join('')
                                    })
                                    .join('') +
                                '<br/>\n'
                        }

                        container.innerHTML +=
                            '\n<pre class="cy-api-logs-messages">' +
                            messages
                                .map(
                                    (m) =>
                                        `<div class="${normalize(m.type)} ${normalize(
                                            m.type,
                                            m.namespace,
                                        )}">${m.type} ${m.namespace}: ${m.message}</div>`,
                                )
                                .join('') +
                            '\n</pre></div>'
                    }
                }
            })
            .then(() => cy.wrap({ messages }, { log: false }))
    } else {
        return cy.wrap({ messages }, { log: false })
    }
}

const normalize = (type: string, namespace: string | null = null): string => {
    let normalized = type.replace('.', '-')
    if (namespace) {
        namespace = namespace.replace('.', '-')
        normalized += `-${namespace}`
    }
    return normalized
}

const addOnClickFilter = (filterId: string): void => {
    // @ts-ignore
    const doc = cy.state('document')
    doc.getElementById(`check-${filterId}`).onclick = () => {
        const checkbox = doc.getElementById(`check-${filterId}`)
        const elements = doc.getElementsByClassName(checkbox.value)
        for (let log of elements) {
            log.style.display = checkbox.checked ? 'block' : 'none'
        }
    }
}

const getContainer = () => {
    // @ts-ignore
    const doc: Document = cy.state('document')
    // @ts-ignore
    const win: Window = cy.state('window')
    let container = doc.querySelector<HTMLElement>('.container')
    if (!container) {
        // clear the body of the application's iframe
        // in Cypress v12
        const innerContainer = doc.querySelector<HTMLElement>('.inner-container')
        if (innerContainer) {
            innerContainer.remove()
        }
        // and Cypress v12 styles
        const styles = doc.querySelector<HTMLElement>('style')
        if (styles) {
            styles.remove()
        }

        // and create our own container
        container = doc.createElement('div')
        container.className = 'container'
        doc.body.appendChild(container)
    }
    container.className = 'container'
    return { container, win, doc }
}

const formatJSon = (jsonObject: object) => {
    return hljs.highlight(JSON.stringify(jsonObject, null, 4), {
        language: 'json',
    }).value
}

const formatRequest = (options: Partial<Cypress.RequestOptions>) => {
    const showCredentials = Cypress.env('API_SHOW_CREDENTIALS')
    const auth = options?.auth as {
        username?: string
        password?: string
        bearer?: string
    }
    const hasPassword = auth?.password
    const hasBearer = auth?.bearer

    if (!showCredentials && hasPassword && hasBearer) {
        return formatJSon({
            ...options,
            auth: {
                ...options.auth,
                bearer: '*****',
                password: '*****',
            },
        })
    } else if (!showCredentials && hasPassword) {
        return formatJSon({
            ...options,
            auth: {
                ...options.auth,
                password: '*****',
            },
        })
    } else if (!showCredentials && hasBearer) {
        return formatJSon({
            ...options,
            auth: {
                ...options.auth,
                bearer: '*****',
            },
        })
    }
    return formatJSon(options)
}

const formatResponseHeaders=(  headers: { [key: string]: string | string[] },) => {
    if (headers?.['content-type']?.includes('application/json')) {
        return formatJSon(headers)
    } else {
        return headers
    }
}

const formatResponse = (
    body: object,
    headers: { [key: string]: string | string[] }
) => {
    if (headers?.['content-type']?.includes('application/json')) {
        return formatJSon(body)
    } else {
        return body
    }
}
// @ts-ignore
const getStatusColorClass=(statusCode)=> {
    let colorClass = '';
    switch (statusCode.toString()[0]) {
        case '2':
            colorClass = 'color-green';
            break;
        case '3':
            colorClass = 'color-orange';
            break;
        case '4':
            colorClass = 'color-blue';
            break;
        case '5':
            colorClass = 'color-red';
            break;
        default:
            colorClass = 'color-red';
    }
    return colorClass;
}
// @ts-ignore
    const getMethodColor=(method) =>{
        switch (method) {
            case 'GET':
                return 'method-get';
            case 'POST':
                return 'method-post';
            case 'PUT':
                return 'method-put';
            case 'DELETE':
                return 'color-red';
            case 'PATCH':
                return 'color-purple'; // Adding color for PATCH method
            case 'HEAD':
                return 'color-cyan'; // Adding color for HEAD method
            case 'OPTIONS':
                return 'color-yellow'; // Adding color for OPTIONS method
            default:
                return 'color-default'; // You can set a default color for unknown methods
        }
    }

