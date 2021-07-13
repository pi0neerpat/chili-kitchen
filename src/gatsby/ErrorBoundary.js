import React from "react"

// WARNING: using this.state.error in the render causes crash
export default class ErrorBoundary extends React.Component {
    constructor(properties) {
        super(properties)
        this.state = {
            hasError: false,
        }
    }

    static getDerivedStateFromError(error) {
        // TODO: Remove eslint-disable
        /* eslint-disable no-console */
        // TODO: Send error to reporting service
        console.log(error)
        return { hasError: true }
    }

    render() {
        const URL = `https://chilikitchen.com`
        const ERROR_MESSAGE = `Oops, something went wrong!`
        const PROMPT = `Reload page`
        const { children } = this.props
        const { hasError } = this.state
        if (hasError) {
            return (
                <main>
                    <style
                        dangerouslySetInnerHTML={{
                            __html: `
              html, body {
                margin: 0;
              }
              html * {
                box-sizing: border-box;
              }
              main {
                display: flex;
                align-items: center;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                text-align: center;
                background-color: #E2E8F0;
                height: 100vh;
              }
              section {
                background-color: white;
                border-radius: 0.25rem;
                width: 32rem;
                padding: 1rem;
                margin: 0 auto;
                box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
              }
              h1 {
                font-size: 2rem;
                margin: 0;
                font-weight: 500;
                line-height: 1;
                color: #2D3748;
              }
              a {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                margin: 2rem 0 0;
              }
            `,
                        }}
                    />
                    <section>
                        <h1>
                            <span>{ERROR_MESSAGE}</span>
                        </h1>
                        <a href={URL}>{PROMPT}</a>
                    </section>
                </main>
            )
        }
        return children
    }
}
