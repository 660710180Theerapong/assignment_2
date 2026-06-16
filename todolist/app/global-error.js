'use client'
 
export default function GlobalError({ error, unstable_retry }) {
  return (
 
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => unstable_retry()}>Try again</button>
      </body>
    </html>
  )
}