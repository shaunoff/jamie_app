import {
  AuditType,
  Audit as AuditT,
  AuditAssessment,
  Day,
  Location,
  AuditSection,
  AuditAction,
} from "@prisma/client"
import jsPDF from "jspdf"
import Dongle from "./dongleFont"
import DongleBold from "./dongleFontBold"
import dayjs from "dayjs"
import normalizeAuditType from "./normalizeAuditType"

//'a4'  : [ 595.28,  841.89]

type Audit = AuditT & {
  auditType: AuditType & {
    auditSection: (AuditSection & {
      auditActions: (AuditAction & {
        auditAssessments: AuditAssessment[]
      })[]
    })[]
  }
  date: Day
  location: Location
}

let height = 30
const printAudit = (audit: Audit) => {
  const normalized = normalizeAuditType(audit)
  const doc = new jsPDF()

  doc.addFileToVFS("Dongle-Light.ttf", Dongle)
  doc.addFileToVFS("Dongle-Regular.ttf", DongleBold)
  doc.addFont("Dongle-Light.ttf", "Dongle", "normal")
  doc.addFont("Dongle-Regular.ttf", "DongleBold", "normal")
  doc.setFont("Dongle")

  createTitle(normalized.auditType.name, doc)
  subTitle(`${normalized.location.name}, ${normalized.month.label}`, doc)

  normalized.auditType.auditSection.map((section) => {
    console.log("before", height)
    if (section.number !== -1) {
      createSectionHeader(section.name, `${section.number}`, doc)
      console.log("after", height)
    }

    section.auditActions.map((actionItem) => {
      const assessment = actionItem.auditAssessments[0]
      const number =
        section.number === -1
          ? `${actionItem.position + 1}`
          : `${section.number}.${actionItem.position + 1}`
      createActionDescription(
        doc,
        actionItem.name,
        number,
        assessment?.comment,
        assessment?.assessment
      )
    })
  })
  const label = `${normalized.location.name}-${normalized.month.value}`.replace(/\s+/g, "_")
  doc.save(`${label}.pdf`)
  height = 30
}

// console.log(
//   "fgsdhjfgjhds",
//   doc.getTextDimensions(
//     "Ensure the premises and equipment are maintained in a good state of repair, especially surfaces and equipment that come into contact with food.",
//     {
//       maxWidth: 200,
//     }
//   )
// )

const createActionDescription = (
  doc: jsPDF,
  text: string,
  number: string,
  comment?: string | null,
  assessment?: number
) => {
  doc.setFontSize(16)
  const { h } = doc.getTextDimensions(text, {
    // font: "Dongle",
    maxWidth: 160,
    fontSize: 16,
  })
  createItemNumber(number, doc, height)
  doc.setTextColor(105, 105, 105)
  doc.text(text, 18, height, {
    maxWidth: 160,
  })
  console.log(assessment)
  doc.addImage(
    `/${assessment === 2 ? "good" : assessment === 1 ? "satisfactory" : "poor"}.png`,
    "PNG",
    185,
    height - 6,
    9,
    9
  )

  height += h
  if (comment) {
    const { h: h2 } = doc.getTextDimensions(comment, {
      // font: "Dongle",
      maxWidth: 160,
      fontSize: 16,
    })
    doc.setDrawColor(211, 211, 211)
    doc.setFillColor(255, 255, 255)
    doc.roundedRect(16, height - 1.5, 162, h2 + 2, 1, 1, "FD")
    doc.text(comment, 18, height + 3, {
      maxWidth: 160,
    })
    height += h2
  }
  if (height <= 250) {
    height += 10
  } else {
    doc.addPage()
    height = 20
  }
}

const createTitle = (text: string, doc: jsPDF) => {
  const original = {
    size: doc.getFontSize(),
    color: doc.getTextColor(),
  }
  doc.setFontSize(28)
  doc.setFont("DongleBold")
  doc.setTextColor("rgb(107, 114, 128)")
  doc.text(text, 8, 8)
  doc.setFontSize(original.size)
  doc.setTextColor(original.color)
  doc.setFont("Dongle")
}

const subTitle = (text: string, doc: jsPDF) => {
  const original = {
    size: doc.getFontSize(),
    color: doc.getTextColor(),
  }
  doc.setFontSize(22)
  doc.setTextColor("rgb(107, 114, 128)")
  doc.text(text, 8, 16)
  doc.setFontSize(original.size)
  doc.setTextColor(original.color)
}

const createItemNumber = (text: string, doc: jsPDF, height: number) => {
  doc.setFillColor(219, 234, 254)
  doc.setTextColor(37, 99, 235)
  doc.setFontSize(16)
  doc.setLineWidth(0.3)
  doc.circle(10, height - 0.5, 4, "F")
  if (text.length === 1) {
    doc.text(text, 9, height + 0.5)
  } else {
    doc.text(text, text.length === 3 ? 8 : 7.4, height + 0.5)
  }
}

const createSectionHeader = (text: string, number: string, doc: jsPDF) => {
  doc.setFont("DongleBold")
  doc.setFillColor(37, 99, 235)
  doc.setLineWidth(0.3)
  doc.setFontSize(20)
  doc.circle(10, height - 0.5, 4, "F")
  doc.setTextColor(255, 255, 255)
  doc.text(number, 9, height + 0.5)
  doc.setFontSize(24)
  doc.setTextColor("rgb(107, 114, 128)")
  doc.text(text, 18, height + 1)
  doc.setFont("Dongle")
  height += 14
}

const getOriginal = (doc: jsPDF) => {
  const original = {
    size: doc.getFontSize(),
    color: doc.getTextColor(),
  }

  return () => {
    doc.setFontSize(original.size)
    doc.setTextColor(original.color)
  }
}
export default printAudit
