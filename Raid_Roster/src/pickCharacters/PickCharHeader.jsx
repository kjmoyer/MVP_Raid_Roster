import { Tooltip, OverlayTrigger } from 'react-bootstrap'

function PickCharHeader({ text, width, sortChars, sortVal}) {

  return (
    <OverlayTrigger
            trigger={['focus', 'hover']}
            placement='top'
            overlay={
              <Tooltip>
                <h6>
                  Click to sort
                </h6>
              </Tooltip>
            }
          >
            <h5 className='specBox charHeader' style={{ width: width }} onClick={e => {sortChars(sortVal)}}>{text}</h5>
          </OverlayTrigger>
  )

}

export default PickCharHeader;