import { Dispatch, SetStateAction } from "react";
import { graphState } from "../Graph/graphHandler";
import { AddEdgeIcon, RemoveEdgeIcon, AddNodeIcon, DeleteNodeIcon, Seperator, CompleteNodeIcon, MoveIcon, PointerIcon} from "./ToolbarIcons";

interface ToolbarButtonProps {
  children: JSX.Element,
  currentTool: string,
  setCurrentTool: Dispatch<SetStateAction<toolStates>>,
  toolName: toolStates
}

interface ToolbarProps {
  currentTool: string,
  setCurrentTool: Dispatch<SetStateAction<toolStates>>,
  graph: graphState
}

export type toolStates =  "pointer" | "addNode" | "completeNode" | "deleteNode" | "addEdge" | "removeEdge" | "pointer" | "move"

const ToolbarButton = ({children, currentTool, setCurrentTool, toolName}: ToolbarButtonProps) => {
  return (
    <button className={`py-2 px-2 mx-1 rounded-md ${currentTool != toolName ? 'hover:bg-neutral-700' : 'bg-blue-500'} `} 
      onClick={() => setCurrentTool(toolName)}>
      {children}
    </button>
  )
}

export function Toolbar({currentTool, setCurrentTool, graph}: ToolbarProps) {

  return (
      <div className="relative top-5 flex w-5/6 max-w-4xl justify-between rounded-xl bg-[#121316] m-auto">
        <div className="flex my-2 mx-5">

          <ToolbarButton currentTool={currentTool} setCurrentTool={setCurrentTool} toolName={"addNode"}>
            <AddNodeIcon/>
          </ToolbarButton>

          <ToolbarButton currentTool={currentTool} setCurrentTool={setCurrentTool} toolName={"completeNode"}>
            <CompleteNodeIcon/>
          </ToolbarButton>

          <ToolbarButton currentTool={currentTool} setCurrentTool={setCurrentTool} toolName={"deleteNode"}>
            <DeleteNodeIcon/>
          </ToolbarButton>

          <Seperator/>

          <ToolbarButton currentTool={currentTool} setCurrentTool={setCurrentTool} toolName={"addEdge"}>
            <AddEdgeIcon/>
          </ToolbarButton>

          <ToolbarButton currentTool={currentTool} setCurrentTool={setCurrentTool} toolName={"removeEdge"}>
            <RemoveEdgeIcon/>
          </ToolbarButton>

          <Seperator/>

          <ToolbarButton currentTool={currentTool} setCurrentTool={setCurrentTool} toolName={"pointer"}>
            <PointerIcon/>
          </ToolbarButton>

          <ToolbarButton currentTool={currentTool} setCurrentTool={setCurrentTool} toolName={"move"}>
            <MoveIcon/>
          </ToolbarButton>
        </div>
        <div></div>
        <div className="flex items-center text-white text-sm font-semibold my-1 mx-5 font-mono">
          <p className="text-neutral-400 text-xs">{ graph.saveState }</p>
          <Seperator/>
          <div>
            <p>x: {Math.round(graph.TopLeftX + window.innerWidth/(graph.scale*2) ?? 0)}</p>
            <p>y: {Math.round(graph.TopLeftY + window.outerWidth/(graph.scale*2) ?? 0)}</p>
          </div>
          <Seperator/>
          {Math.round(graph.scale*10)}%
        </div>
      </div>
  )


}


export const hintText = (t: string, selectedCount: number) => {
  switch(t) {
    case "addEdge":
      return <>Select the node you want to <span className={"text-green-500"}>connect {selectedCount === 0 ? "from" : "to"}</span> </>
    case "removeEdge":
      return <>select the <span className="text-red-500">{selectedCount === 0 ? "first" : "second"}</span> node of the pair you want to <span className="text-red-500">disconnect</span></>
    case "addNode":
      return <>click anywhere on the screen to <span className="text-green-500">create</span> a node there</>
    case "deleteNode":
      return <>click on a node to <span className="text-red-500">permanently delete</span> it</>
    case "completeNode":
      return <>click on a node to mark it as <span className="text-green-500">complete</span></>
    default:
      return <></>
  }
}
