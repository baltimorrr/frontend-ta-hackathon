import React, { useMemo } from 'react'
import { Box } from '@mui/material'
import loadable from '@loadable/component'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/toolbar/lib/styles/index.css'
import { base64toBlob } from 'utils/pdf'
const ReactPdfViewerCore = loadable.lib(() => import('@react-pdf-viewer/core'))
const ReactPdfViewerToolbar = loadable.lib(() =>
  import('@react-pdf-viewer/toolbar')
)

const PDF_VIEWER_TOOLBAR = {
  ZOOM_OUT: 'ZoomOut',
  ZOOM: 'Zoom',
  ZOOM_IN: 'ZoomIn',
  GO_TO_PREVIOUS_PAGE: 'GoToPreviousPage',
  CURRENT_PAGE_INPUT: 'CurrentPageInput',
  NUMBER_OF_PAGES: 'NumberOfPages',
  GO_TO_NEXT_PAGE: 'GoToNextPage',
  ENTER_FULLSCREEN: 'EnterFullScreen',
  DOWNLOAD: 'Download',
  PRINT: 'Print',
}

const PDF_VIEWER_TOOLBAR_STYLE = {
  GO_TO_PREVIOUS_PAGE: {
    marginLeft: 'auto',
  },
  CURRENT_PAGE_INPUT: {
    width: '4rem',
  },
  ENTER_FULLSCREEN: {
    marginLeft: 'auto',
  },
}
export default function ReactPdfViewer({
  fileUrl,
  base64,
  toolbarStyles,
  openToolbar = false,
  hiddenToolbars = [],
  className,
}) {
  const url = useMemo(() => {
    if (fileUrl) return fileUrl

    if (!base64) return ''

    return URL.createObjectURL(base64toBlob(base64))
  }, [fileUrl, base64])

  return (
    <ReactPdfViewerCore>
      {({ Viewer, Worker, SpecialZoomLevel }) => (
        <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.7.570/es5/build/pdf.worker.js'>
          <ReactPdfViewerToolbar>
            {({ toolbarPlugin }) => (
              <PdfViewerRender
                url={url}
                toolbarPlugin={toolbarPlugin}
                Viewer={Viewer}
                SpecialZoomLevel={SpecialZoomLevel}
                openToolbar={openToolbar}
                toolbarStyles={toolbarStyles}
                hiddenToolbars={hiddenToolbars}
                className={className}
              />
            )}
          </ReactPdfViewerToolbar>
        </Worker>
      )}
    </ReactPdfViewerCore>
  )
}

function PdfToolbarRender({
  ToolbarComp,
  toolbarStyles = PDF_VIEWER_TOOLBAR_STYLE,
  hiddenToolbars = [],
}) {
  return (
    <ToolbarComp>
      {(slots) => (
        <div
          style={{
            alignItems: 'center',
            display: 'flex',
            width: '100%',
            background: 'rgb(238, 238, 238)',
            padding: '8px',
          }}
        >
          {Object.keys(PDF_VIEWER_TOOLBAR).map((comp) => {
            const Component = slots?.[PDF_VIEWER_TOOLBAR[comp]]

            if (!Component || hiddenToolbars.includes(PDF_VIEWER_TOOLBAR[comp]))
              return null

            return (
              <React.Fragment key={comp}>
                <div
                  style={{
                    padding: '0px 2px',
                    ...(toolbarStyles?.[comp] || {}),
                  }}
                >
                  <Component />
                </div>
              </React.Fragment>
            )
          })}
        </div>
      )}
    </ToolbarComp>
  )
}

function PdfViewerRender({
  url,
  toolbarPlugin,
  Viewer,
  SpecialZoomLevel,
  toolbarStyles,
  hiddenToolbars = [],
  openToolbar = false,
  className = 'react-pdf-viewer-container',
}) {
  const toolbarPluginInstance = toolbarPlugin()
  const { Toolbar } = toolbarPluginInstance

  return (
    <>
      {openToolbar && (
        <PdfToolbarRender
          ToolbarComp={Toolbar}
          toolbarStyles={toolbarStyles}
          hiddenToolbars={hiddenToolbars}
        />
      )}

      <Box
        className={className}
        sx={{
          ...(openToolbar && {
            height: 'calc(100vh - 200px)',
            overflowY: 'auto',
            border: '1px solid rgba(0, 0, 0, 0.1)',
          }),
        }}
      >
        <Viewer
          fileUrl={url}
          plugins={[toolbarPluginInstance]}
          defaultScale={SpecialZoomLevel.PageWidth}
        />
      </Box>
    </>
  )
}
