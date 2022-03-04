import type {NextPage} from 'next'
import Head from 'next/head'
import {useEffect, useState} from "react";
import copy = Simulate.copy;

interface RowProps {
  length: number,
  currentColor: string,
  value: string[]
}

// ⬛⬛⬛⬛⬛
// 🟨⬛🟨🟩⬛
// 🟩🟩🟩🟩
// 🟩

const Row = ({length, currentColor, value}: RowProps) => {
  const [values, setValues] = useState<string[]>([]);

  useEffect(() => {
    setValues(new Array(length).fill(currentColor))
  }, [length])

  useEffect(() => {
    setValues(value)
  }, [value])


  let changeValue = (index: number) => {
    setValues(prev => {
      let copy = [...prev];
      copy[index] = currentColor;
      return copy;
    });
    console.log("change value", index, currentColor);
  }

  return (
    <div className="flex flex-row gap-2">
      {values.map((each, i) => {
        return <div key={i} className="cursor-pointer transition-colors	" onClick={() => changeValue(i)}>
          {each}
        </div>
      })}
    </div>
  )
}

let multiply = (times: number, value: string): string => {
  let s = ""
  for (let i = 0; i < times; i++) {
    s += value;
  }
  return s;
}

const WordleArtDrawer = () => {
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(5);
  const [currentColor, setCurrentColor] = useState<string>("🟩");

  const [values, setValues] = useState<string[][]>([[]])

  useEffect(() => {
    setValues(prev => {
      let copy = [...prev];
      if (rows < copy.length) {
        copy = copy.slice(0, rows)
      } else if (rows > copy.length) {
        for (let i = copy.length; i < rows; i++) {
          var xx = new Array(columns).fill(currentColor);
          copy.push(xx)
        }
      } else {

        // columns changed
        console.log("jj");
        for (let i = 0; i < copy.length; i++) {
          var xx = new Array(columns).fill(currentColor);
          copy[i] =  xx;
        }

      }
      return copy;
    })

  }, [rows, columns])

  return (
    <div>

      <div className="my-3">
        Rows: {rows}
        <div>
          1 <input type="range" min={1} max={20} onInput={e => {
          // @ts-ignore
          console.log(e.target.value)
          setRows(e.target.value);
        }}/> 20
        </div>
      </div>
      <div className="my-3">
        Columns: {columns}
        <div>
          1 <input type="range" min={1} max={20} onInput={e => {
          // @ts-ignore
          console.log(e.target.value)
          setColumns(e.target.value);
        }}/> 20
        </div>
      </div>


      <div className="flex flex-col text-3xl">
        {values.map((each, i) => {
          return <Row key={i}  length={columns} currentColor={currentColor} value={each}/>
        })}
      </div>

      <div className="mt-5">
        Current color: {currentColor}
      </div>

      <div className="tracking-wider">
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
    </div>
  )
}

const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Wordleart</title>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className="flex flex-1 flex-col mt-20 text-center container">
        <div className="my-3 w-full">
          <h1 className="text-6xl font-bold border-b text-blue-600 border-blue-600">Wordleart</h1>
        </div>


        <div className="p-5 text-center justify-center flex">

          <WordleArtDrawer/>

        </div>

        <div className="text-lg text-left border border-blue-300 rounded p-5">
      <pre>{`
What do I want?
[ ] Define how many rows
[ ] Define how many columns
[x] Show initially some green ones
[x] Ability to change the colors of each block
[ ] Abiltiy to define the spacing between
[ ] Super: Export to PNG
[ ] Deploy to wordleart.kiru.io
[ ] Set proper Favicon 
[ ] Add a Wordleart icon here 
[ ] Add Plausible.io
[ ] Ability to export the patterns!
[ ] Add proper og:tags 
[ ] Add Twitter card
`}</pre>
        </div>


      </main>
    </div>
  )
}

export default Home
