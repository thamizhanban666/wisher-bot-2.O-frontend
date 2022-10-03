import React from 'react'

function ViewImage({selectedImg}) {
  return (
    <>
    <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabindex="-1">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* <div className="modal-header">
          </div> */}
          <div className="modal-body d-flex justify-content-center">
              <img src={selectedImg?.url} alt="Selected Image" style={{minWidth:"300px"}} />
          </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-primary" data-bs-target="#exampleModalToggle2" data-bs-toggle="modal" data-bs-dismiss="modal">Schedule Email</button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default ViewImage