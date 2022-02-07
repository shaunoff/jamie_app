import { CheckIcon, FolderAddIcon, XIcon } from "@heroicons/react/outline"
import React, { useState } from "react"
import Input from "app/core/components/Input"
import partition from "app/shared/utils/partition"
import createAction from "app/actions/mutations/createAction"
import { AuditTypes } from "./AuditTypesAdmin"
import { useMutation, useQuery } from "blitz"

interface CreateActionItemProps {
  sectionId: number
  auditTypes: AuditTypes
  updateAuditTypes: (AuditTypes: AuditTypes) => void
  auditTypeId: number
}

const CreateActionItem: React.FC<CreateActionItemProps> = ({
  sectionId,
  auditTypes,
  updateAuditTypes,
  auditTypeId,
}) => {
  const [createActionMutation] = useMutation(createAction)
  const [isEditActive, setIsEditActive] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const [activeType, otherTypes] = partition(
    auditTypes,
    (auditType) => auditType.id === auditTypeId
  )
  const currentType = activeType[0]!
  const [activeSection, otherSections] = partition(
    currentType?.auditSection,
    (auditSection) => auditSection.id === sectionId
  )

  const currentSection = activeSection[0]!
  const auditActions = currentSection?.auditActions

  const handleCreate = async () => {
    setLoading(true)
    const newAction = {
      name: inputValue,
      position: auditActions.length,
      auditSectionId: currentSection.id,
    }
    const created = await createActionMutation(newAction)
    // const currentAction = activeAction[0]!
    // const newAction = { ...currentAction, name: inputValue }

    const allActions = [...auditActions, created].sort((a, b) => a.position - b.position)
    const newSection = { ...currentSection, auditActions: allActions }
    const allSections = [newSection, ...otherSections]
    const newType = { ...currentType, auditSection: allSections }
    const allTypes = [newType, ...otherTypes]
    updateAuditTypes(allTypes)
    setLoading(false)
    setIsEditActive(false)
    setInputValue("")
  }

  return isEditActive ? (
    <div className={`flex py-6 pl-8 pr-4 w-full align-baseline ${loading && "opacity-50"}`}>
      <Input
        label="Action Item"
        className="mr-9 w-full"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        disabled={loading}
      />
      <div className="flex items-center  ml-2 mt-6">
        <CheckIcon className="h-8 w-8 text-green-500 mr-2 cursor-pointer" onClick={handleCreate} />
        <XIcon
          className="h-8 w-8 text-red-500 cursor-pointer"
          onClick={() => {
            setIsEditActive(false)
          }}
        />
      </div>
    </div>
  ) : (
    <>
      <div
        className="mx-8 my-2 flex justify-center px-6 py-2 border-2 border-blue-300 border-dashed rounded-md cursor-pointer"
        onClick={() => setIsEditActive(!isEditActive)}
      >
        <div className="flex flex-col align-center justify-center">
          <div className="flex justify-center">
            <FolderAddIcon className="h-6 w-6 text-blue-400" />
          </div>
          <p className="text-base text-gray-500">Add Action Item</p>
        </div>
      </div>
    </>
  )
}

export default CreateActionItem
