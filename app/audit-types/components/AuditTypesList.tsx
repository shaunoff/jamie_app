import { ChevronDownIcon, ChevronRightIcon, DotsVerticalIcon } from "@heroicons/react/outline"
import React, { useState, Fragment, ReactNode } from "react"
import { Transition, Disclosure } from "@headlessui/react"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DraggingStyle,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd"
import { AuditTypes } from "./AuditTypesAdmin"
import AuditSectionList from "./AuditSectionList"

interface AuditTypesListProps {
  auditTypes: AuditTypes
  updateAuditTypes: (AuditTypes: AuditTypes) => void
}

const AuditTypesList: React.FC<AuditTypesListProps> = ({ auditTypes, updateAuditTypes }) => {
  const [items, setItems] = useState<AuditTypes>(auditTypes)

  const onDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    const reordered = reorder(items, result.source.index, result.destination.index)
    console.log("should update", reordered)
    updateAuditTypes(reordered)
    setItems(reordered)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="auditType">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            className="space-y-2"
          >
            {items.map((item, index) => (
              <Draggable key={`item-${item.id}`} draggableId={`item-${item.id}`} index={index}>
                {(provided, snapshot) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                    className={`bg-white shadow overflow-hidden sm:rounded-md ${
                      snapshot.isDragging ? "border-2 border-dashed border-blue-500" : ""
                    }`}
                  >
                    <Disclosure>
                      {({ open }) => (
                        <>
                          <Disclosure.Button as={Fragment}>
                            <div
                              className={`block cursor-pointer ${
                                open && "border-b-gray-200 border-b bg-gray-50"
                              }`}
                            >
                              <div className="px-4 py-4 flex items-center sm:px-6 hover:bg-gray-50">
                                <div className="mr-4" {...provided.dragHandleProps}>
                                  <DotsVerticalIcon className="h-5 w-5 text-gray-500" />
                                </div>
                                <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                                  <div className="truncate">
                                    <p className="font-bold text-gray-700 truncate">{item.name}</p>
                                    <p className="flex-shrink-0 font-normal text-gray-500 text-sm">
                                      {item.description}
                                    </p>
                                  </div>
                                </div>
                                <div className="ml-5 flex-shrink-0">
                                  {open ? (
                                    <ChevronDownIcon
                                      className="h-5 w-5 text-gray-400"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </Disclosure.Button>

                          {open && (
                            <div>
                              <Disclosure.Panel>
                                <AuditSectionList
                                  auditTypeId={item.id}
                                  auditTypes={auditTypes}
                                  auditSection={item.auditSection}
                                  updateAuditTypes={updateAuditTypes}
                                />
                              </Disclosure.Panel>
                            </div>
                          )}
                        </>
                      )}
                    </Disclosure>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default AuditTypesList

const reorder = (list: AuditTypes, startIndex: number, endIndex: number) => {
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

const getListStyle = (isDraggingOver: boolean): React.CSSProperties => ({
  //background: isDraggingOver ? "lightblue" : "lightgrey",
  //padding: grid,
  //width: 250,
})
