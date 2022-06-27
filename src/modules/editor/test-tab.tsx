import React, { useMemo } from "react"
import { Button, Spacer } from "@geist-ui/core"
import Plus from "@geist-ui/icons/plus"
// import Copy from "@geist-ui/icons/copy"
// import { useTranslation } from "react-i18next"
import { useAtomValue } from "jotai"
import { useLocalStorage } from "react-use"
import produce from "immer"
import TestItem from "@/components/test-item"
import { gen } from "@/parser"
import { astAtom } from "@/atom"

const TestTab = () => {
  // const { t } = useTranslation()
  const [cases, setCases] = useLocalStorage<string[]>("test-case", [""])
  const ast = useAtomValue(astAtom)
  const regExp = useMemo(() => {
    const regex = gen(ast, { isLiteral: false, escapeSlash: ast.withSlash })
    return new RegExp(regex, ast.flags.join(""))
  }, [ast])

  // const { setToast } = useToasts()
  // const { copy } = useClipboard()
  // const handleCopyPermalink = () => {
  //   copy("hello, geist-ui")
  //   setToast({ text: t("Permalink copied.") })
  // }

  const handleChange = (value: string, index: number) => {
    setCases(
      produce(cases!, (draft) => {
        draft[index] = value
      })
    )
  }

  const handleRemove = (index: number) => {
    setCases(
      produce(cases!, (draft) => {
        draft.splice(index, 1)
      })
    )
  }

  const handleAdd = () => {
    setCases(
      produce(cases!, (draft) => {
        draft.push("")
      })
    )
  }

  return (
    <>
      <div className="wrapper">
        {cases!.map((value, index) => (
          <React.Fragment key={index}>
            <TestItem
              value={value}
              regExp={regExp}
              onChange={(value) => handleChange(value, index)}
              onRemove={() => handleRemove(index)}
            />
            <Spacer h={0.5} />
          </React.Fragment>
        ))}
        <div className="btn">
          <Button
            iconRight={<Plus />}
            auto
            scale={2 / 3}
            px={0.6}
            onClick={handleAdd}
          />
          {/* <Spacer w={1} />
          <Button
            iconRight={<Copy />}
            auto
            scale={2 / 3}
            px={0.6}
            onClick={handleCopyPermalink}
          /> */}
        </div>
      </div>
      <style jsx>{`
        .wrapper {
          padding: 24px 12px;
        }
        .btn {
          display: flex;
          justify-content: center;
          margin-top: 12px;
        }
      `}</style>
    </>
  )
}

export default TestTab
