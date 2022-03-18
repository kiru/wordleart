import type {NextPage} from 'next'
import Head from 'next/head'
import {useEffect, useState} from "react";
import {toast, Toaster} from "react-hot-toast";

const Link = ({link, name}: any) => {
  return (
    <a href={link} target="_blank"
       className="bg-white text-black p-1 px-2  rounded-lg hover:bg-blue-800 hover:text-white">{name}</a>
  )
}



interface RowProps {
  currentColor: string,
  value: string[],
  setValue: (s: string[]) => void
}

const Row = ({currentColor, value, setValue}: RowProps) => {

  let changeValue = (index: number) => {
    let copy = [...value];
    copy[index] = currentColor;
    console.log("change value", index, currentColor);
    return setValue(copy);
  }

  return (
    <div className="flex  flex-row gap-2 justify-center	font-mono">
      {value.map((each, i) => {
        return <div key={i} className="cursor-pointer transition-colors	" onClick={() => changeValue(i)}>
          {each}
        </div>
      })}
    </div>
  )
}

let createMatrix = (rows: number, columns: number, defaultVaue: string): string[][] => {
  let array = new Array(rows).fill(defaultVaue);

  for (let i = 0; i < array.length; i++) {
    array[i] = new Array(columns).fill(defaultVaue);
  }
  return array;
}

const WordleArtDrawer = () => {
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(5);
  const [currentColor, setCurrentColor] = useState<string>("🟩");

  const [values, setValues] = useState<string[][]>([[]])

  useEffect(() => {
    setValues(prev => {
      let resultMatrix = createMatrix(rows, columns, currentColor);

      for (let i = 0; i < Math.min(prev.length, resultMatrix.length); i++) {
        let currentRow = resultMatrix[i];
        let prevRow = prev[i];

        for (let j = 0; j < Math.min(prevRow.length, currentRow.length); j++) {
          resultMatrix[i][j] = prev[i][j];
        }
      }
      return resultMatrix;
    })

  }, [rows, columns])

  const onShare = () => {
    let messageToCopy = "";
    for (let i = 0; i < values.length; i++) {
      for (let j = 0; j < values[i].length; j++) {
        messageToCopy += values[i][j];
      }
      messageToCopy += "\n";
    }
    messageToCopy += "wordleart.kiru.io\n"

    navigator.clipboard.writeText(messageToCopy);
    toast.success("Copied successfully.");
  }

  return (
    <div className="">
      <div className="flex flex-row gap-4 justify-center	">
        <div className="my-3">
          <span className="text-slate-600 text-sm">{rows} rows</span>
          <div className="flex flex-row gap-2 text-blue-800 font-bold">
            <span>1</span>
            <input type="range" min={1} max={20} className="" onInput={e => {
              // @ts-ignore
              setRows(parseInt(e.target.value));
            }}/>
            <span>20</span>
          </div>
        </div>
        <div className="my-3">
          <span className="text-slate-600 text-sm">{columns} columns</span>
          <div className="flex flex-row gap-2 text-blue-800 font-bold">
            <span>1</span>
            <input type="range" min={1} max={20} onInput={e => {
              // @ts-ignore
              setColumns(parseInt(e.target.value));
            }}/>
            <span>20</span>
          </div>
        </div>
      </div>

      <div className="mx-auto p-5">
        <div className="flex flex-col text-3xl">
          {values.map((each, i) => {
            return <Row key={i} currentColor={currentColor} value={each}
                        setValue={o => setValues(prev => {
                          let copy = [...prev]
                          copy[i] = o
                          return copy;
                        })}/>
          })}
        </div>
      </div>

      <div className="mt-5 text-sm text-slate-800">
        {currentColor}
      </div>

      <div className="tracking-wider text-3xl">
        <span className="cursor-pointer" onClick={() => setCurrentColor("🟥")}>🟥</span>
        <span className="cursor-pointer" onClick={() => setCurrentColor("🟧")}>🟧</span>
        <span className="cursor-pointer" onClick={() => setCurrentColor("🟨")}>🟨</span>
        <span className="cursor-pointer" onClick={() => setCurrentColor("🟩")}>🟩</span>
        <span className="cursor-pointer" onClick={() => setCurrentColor("🟦")}>🟦</span>
        <span className="cursor-pointer" onClick={() => setCurrentColor("🟪")}>🟪</span>
        <span className="cursor-pointer" onClick={() => setCurrentColor("⬛")}>⬛</span>
        <span className="cursor-pointer" onClick={() => setCurrentColor("⬜")}>⬜</span>
        <span className="cursor-pointer" onClick={() => setCurrentColor("🟫")}>🟫</span>
      </div>

      <div className="bg-blue-100 rounded-lg hover:bg-blue-800 hover:text-white cursor-pointer  " onClick={onShare}>
        Share!
      </div>
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>WordleArt</title>
        <link rel="icon" href="/favicon.ico"/>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/>
        <link rel="manifest" href="/site.webmanifest"/>
        <script defer data-domain="wordleart.kiru.io" src="https://plausible.io/js/plausible.js"></script>

        <meta name="description" content="Create your own emoji block based wordle art"/>

        <meta property="og:url" content="https://wordleart.kiru.io"/>
        <meta property="og:type" content="website"/>
        <meta property="og:site_name" content="WordleArt"/>
        <meta property="og:description"
              content="Create your own emoji block based wordle art"/>
        <meta property="og:title" content="WorldeArt"/>
        <meta property="og:image" content="https://wordleart.kiru.io/TwitterCard.png"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      </Head>

      <main className="flex flex-col items-center justify-center my-8 ">
        <div className="flex flex-col mt-5 items-center">
          <img src="square.png" className="w-24 " alt="Logo"/>
          <h1 className="text-2xl font-bold text-black text-blue-500">WordleArt</h1>
        </div>

        <div className="flex flex-1 flex-col mt-5 text-center sm:rounded-3xl shadow border border-slate-300">
          <div className="p-5 text-center justify-center flex bg-white rounded-t-3xl">
            <WordleArtDrawer/>
          </div>

          <div><Toaster/></div>

          <div className="text-lg text-left p-5 bg-blue-100 font-mono sm:rounded-b-3xl">
            <h2 className="text-xl">What is this project about?</h2>
            <p className="w-1/2 pt-2 text-slate-700">
              I wanted a simple tool to create logo similar to how people share their Wordle results.
            </p>

            <h2 className="text-xl pt-5">Who made this?</h2>
            <p className="w-1/2 pt-2 text-slate-700">
              My name is Kiru. If you want to see other projects by me, follow me on
              Twitter <Link link={"https://twitter.com/kiru_io"} name="@kiru_io" />.
            </p>

            <h2 className="text-xl pt-5">Any other projects by Kiru?</h2>
            <p className="w-1/2 pt-2 text-slate-700">
              Sure, here you go:
              <div className="gap-2 flex">
                <Link link={"https://mathlegame.com/"} name="Mathle" />
                <Link link={"https://reversle.net/"} name="Reversle" />
                <Link link={"https://learnle.net/"} name="Reversle" />
              </div>
            </p>

            <h2 className="text-xl pt-5">Roadmap</h2>
            <pre className="whitespace-pre-wrap	">
{`[ ] Deploy to wordleart.kiru.io
[ ] Write an article on my page
[ ] Publish project on GitHub as Open Source (why not?)(postponed for now)
[ ] Clean this code a bit before putting it on GitHub`}</pre>
          </div>
        </div>


      </main>
      <a target="_blank" href="https://kiru.io/"
         className="kiru items-center rounded-tl-lg hover:bg-blue-500 hover:text-white bg-blue-300 align-middle	">
        <img src="mini-kiru.jpg" alt="Kiru Logo" className="rounded-full h-6" /><p className="m-1">by Kiru.io</p>
      </a>
    </div>
  )
}

export default Home
