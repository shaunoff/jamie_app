import React, { useEffect, useState } from "react"
import db, { Location, AuditType, AuditSection, AuditAction } from "db"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd"
import { CheckIcon, DotsVerticalIcon, PencilIcon, XIcon } from "@heroicons/react/outline"
import updateAuditActionPositions from "app/actions/mutations/updateAuditActionsPositions"
import updateAuditAction from "app/actions/mutations/updateAction"
import getAction from "app/actions/queries/getAction"
import { useMutation, useQuery } from "blitz"
import partition from "app/shared/utils/partition"

import Input from "app/core/components/Input"
import { AuditTypes } from "./AuditTypesAdmin"

interface ActionItemListProps {
  sectionId: number
  auditTypes: AuditTypes
  updateAuditTypes: (AuditTypes: AuditTypes) => void
  auditTypeId: number
}

const ActionItemList: React.FC<ActionItemListProps> = ({
  sectionId,
  auditTypes,
  updateAuditTypes,
  auditTypeId,
}) => {
  const [activeType, otherTypes] = partition(
    auditTypes,
    (auditType) => auditType.id === auditTypeId
  )
  const currentType = activeType[0]!
  const [activeSection, otherSections] = partition(
    currentType?.auditSection,
    (auditSection) => auditSection.id === sectionId
  )
  console.log("wtf", activeSection[0])
  const currentSection = activeSection[0]!
  const auditActions = currentSection?.auditActions

  const [disableDrag, setDisableDrag] = useState(false)

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }
    const reordered = reorder(auditActions, result.source.index, result.destination.index)
    // updateAuditActionPositionsMutation(reordered.map(({ name, ...data }) => data))
    const newSection = { ...currentSection, auditActions: reordered }
    const allSections = [newSection, ...otherSections]
    const newType = { ...currentType, auditSection: allSections }
    const allTypes = [newType, ...otherTypes]
    updateAuditTypes(allTypes)
  }

  const handleNameChange = ({ inputValue, item }: { inputValue: string; item: AuditAction }) => {
    const [activeAction, otherActions] = partition(
      auditActions,
      (auditAction) => auditAction.id === item.id
    )
    const currentAction = activeAction[0]!
    const newAction = { ...currentAction, name: inputValue }
    const allActions = [newAction, ...otherActions].sort((a, b) => a.position - b.position)
    const newSection = { ...currentSection, auditActions: allActions }
    const allSections = [newSection, ...otherSections]
    const newType = { ...currentType, auditSection: allSections }
    const allTypes = [newType, ...otherTypes]
    updateAuditTypes(allTypes)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="auditAction">
        {(provided, snapshot) => (
          <div className="" {...provided.droppableProps} ref={provided.innerRef}>
            {auditActions.map((item, index) => (
              <ActionItem
                key={`audit-${index}`}
                sectionNumber={currentSection?.number || 0}
                item={item}
                index={index}
                disableDrag={disableDrag}
                setDisableDrag={setDisableDrag}
                handleNameChange={handleNameChange}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default ActionItemList

interface ActionItemProps {
  index: number
  item: AuditAction
  sectionNumber: number
  disableDrag: boolean
  setDisableDrag: React.Dispatch<React.SetStateAction<boolean>>
  handleNameChange: (arg: { inputValue: string; item: AuditAction }) => void
}

const ActionItem: React.FC<ActionItemProps> = React.memo(
  ({ index, item, sectionNumber, disableDrag, setDisableDrag, handleNameChange }) => {
    const [inputValue, setInputValue] = useState<string>(item.name)
    const [isEditMode, setIsEditMode] = useState<boolean>(false)

    useEffect(() => {
      setInputValue(item.name)
    }, [item.name])

    const handleUpdateAction = async () => {
      setIsEditMode(false)
      setDisableDrag(false)
      handleNameChange({ inputValue, item })
    }

    return (
      <Draggable key={`audit-${index}`} draggableId={`audit-${index}`} index={index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            ref={provided.innerRef}
            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
          >
            <div className="flex items-center px-2 py-4 sm:px-6">
              <div
                className={`mr-2 ${disableDrag && "opacity-20"}`}
                {...(disableDrag ? {} : provided.dragHandleProps)}
              >
                <DotsVerticalIcon className="h-5 w-5 text-gray-500" />
              </div>
              <div className="mr-4 flex justify-center flex-shrink-0">
                <p className="px-2.5 py-1 rounded-full text-sm font-bold bg-blue-100 text-blue-800">{`${
                  sectionNumber !== -1 ? `${sectionNumber} .` : ""
                } ${item.position + 1}`}</p>
              </div>
              {isEditMode ? (
                <div className="mr-8 w-full">
                  <Input
                    className="w-full"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  <span>{inputValue}</span>
                </p>
              )}
              {isEditMode ? (
                <div className="flex">
                  <CheckIcon
                    className="h-8 w-8 text-green-500 mr-2 cursor-pointer"
                    onClick={handleUpdateAction}
                  />
                  <XIcon
                    className="h-8 w-8 text-red-500 cursor-pointer"
                    onClick={() => {
                      setInputValue(item.name)
                      setIsEditMode(false)
                      setDisableDrag(false)
                    }}
                  />
                </div>
              ) : (
                <PencilIcon
                  className={`h-5 w-5 text-blue-500 ml-auto cursor-pointer ${
                    disableDrag && "opacity-30"
                  }`}
                  onClick={() => {
                    if (!disableDrag) {
                      setIsEditMode(!isEditMode)
                      setDisableDrag(true)
                    }
                  }}
                />
              )}
              {/* <ActionText name={item.name} /> */}
            </div>
          </div>
        )}
      </Draggable>
    )
  }
)

const reorder = (list: AuditAction[], startIndex: number, endIndex: number): AuditAction[] => {
  const result = Array.from(list)

  const [removed] = result.splice(startIndex, 1)
  if (!removed) {
    return list
  }
  result.splice(endIndex, 0, removed)
  // Add new positions to array
  return result.map((item, index) => ({ ...item, position: index }))
}

const getItemStyle = (
  isDragging: boolean,
  draggableStyle?: DraggableProvidedDraggableProps["style"]
): React.CSSProperties => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // styles we need to apply on draggables
  ...draggableStyle,
})

// const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
//   //background: isDraggingOver ? "lightblue" : "lightgrey",
//   //padding: grid,
//   //width: 250,
// })
