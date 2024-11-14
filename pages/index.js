import Head from 'next/head'
import { useState, useEffect } from 'react'

const excuses = [
  "The coffee machine is broken!",
  "It’s National Nap Day.",
  "I heard Mercury is in retrograde.",
  "I'm still recovering from the weekend.",
  "My cat is sitting on my lap, can't move.",
  "It's taco Tuesday, can't work on an empty stomach.",
  "The weather is too nice to stay inside.",
  "I'm in the middle of a Netflix binge.",
  "My plants need watering, it's urgent!",
  "I deserve a self-care day.",
  "My alarm didn’t go off… or I just ignored it.",
  "I can’t find my lucky work socks.",
  "I'm waiting for inspiration to strike.",
  "I’m too important to be doing this work.",
  "I can’t focus, my dog keeps giving me judgmental looks.",
  "I accidentally took a nap. Oops.",
  "I'm saving my energy for the weekend.",
  "It’s 2024, aren’t robots supposed to do this by now?",
  "I'm mentally preparing for next week's meeting.",
  "My horoscope said it's a bad day to make decisions.",
  "I spilled coffee on my keyboard, it’s drying now.",
  "I'm protesting Mondays by not working today.",
  "I need to realign my chakras before I can be productive.",
  "My Wi-Fi is acting up... again.",
  "I can't stop thinking about snacks.",
  "I was up all night stressing about work... so I can't do it today.",
  "My work-from-home setup is too cozy to work right now.",
  "I think I have a case of the Mondays, even though it's not Monday.",
  "The sun is shining, my work ethic is not.",
  "I’m practicing the art of doing nothing.",
  "I'm out of office, mentally.",
  "I don’t want to overachieve this early in the week.",
  "It's national 'Stay in bed' day. I declared it.",
  "My brain called in sick, so I'm following suit.",
  "I’m prioritizing my well-being over my to-do list.",
  "I need to brainstorm some work ideas… in my dreams.",
  "I'm on a creative break, for like... the whole day.",
  "I haven't had my third cup of coffee yet.",
  "I forgot how to work today.",
  "The universe is telling me not to work.",
  "I’m just here for moral support, not actual work.",
  "I'm recharging my productivity for tomorrow.",
  "I can’t work with these post-weekend vibes.",
  "My productivity levels are still loading… please wait.",
  "It’s my birthday today.",
  "It must be 6pm somewhere..."
];

export default function Home({ initialExcuse, host }) {
    const [excuse, setExcuse] = useState(initialExcuse)
    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL ?
        `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` :
        `http://${host}`

    function getRandomExcuse() {
        const randomIndex = Math.floor(Math.random() * excuses.length)
        setExcuse(excuses[randomIndex])
    }

    const ogImageUrl = `${baseUrl}/api/og?text=${encodeURIComponent(excuse)}`

    return (
        <div>
            <Head>
                <title>Should I Work Today?</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:title" content="Should I Work Today?" />
                <meta property="og:description" content={excuse} />
                <meta property="og:image" content={ogImageUrl} />
                <meta property="og:url" content={baseUrl} />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Should I Work Today?" />
                <meta name="twitter:description" content={excuse} />
                <meta name="twitter:image" content={ogImageUrl} />
            </Head>

            <main className="container">
                <div className="message">
                    <div id="capture-area">
                        <p id="question">Should I work today?</p>
                        <h1 id="excuse">{excuse}</h1>
                    </div>
                    <div className="share-container">
                        <button className="share-button" onClick={getRandomExcuse}>Try Another Excuse</button>
                    </div>
                </div>

                <footer>
                    <p>Proudly created by AI <a href="https://github.com/a-bx/shouldiwork.today">shouldiwork.today</a></p>
                    <iframe src="https://ghbtns.com/github-btn.html?user=a-bx&repo=shouldiwork.today&type=star&count=true" frameBorder="0" scrolling="0" width="150" height="20" title="GitHub"></iframe>
                </footer>
            </main>

            <style jsx global>{`
                body {
                    margin: 0;
                    font-family: Arial, sans-serif;
                    background-color: #f3f4f6;
                }

                .container {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }

                .message {
                    text-align: center;
                    font-size: 2em;
                    max-width: 80%;
                    color: #111827;
                    flex-grow: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin: 0 auto;
                }

                #capture-area {
                    background-color: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    margin: 20px;
                    width: 100%;
                    max-width: 800px;
                }

                #question {
                    margin-bottom: 20px;
                    font-size: 1.2em;
                }

                #excuse {
                    font-size: 1.5em;
                    margin: 0;
                }

                .share-container {
                    margin: 20px 0;
                }

                .share-button {
                    background-color: #3b82f6;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 0.5em;
                    transition: background-color 0.2s;
                }

                .share-button:hover {
                    background-color: #2563eb;
                }

                footer {
                    width: 100%;
                    text-align: center;
                    padding: 10px;
                    background-color: #f1f5f9;
                    font-size: 0.9em;
                    color: #4b5563;
                }

                footer a {
                    color: #3b82f6;
                    text-decoration: none;
                }

                footer a:hover {
                    text-decoration: underline;
                }
            `}</style>
        </div>
    )
}

export async function getServerSideProps({ req }) {
    const initialExcuse = excuses[Math.floor(Math.random() * excuses.length)]
    const host = req.headers.host || 'localhost:3000'

    return {
        props: {
            initialExcuse,
            host
        }
    }
}