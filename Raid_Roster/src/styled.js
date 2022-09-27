import styled from 'styled-components'

let styles = {
  modal: styled.div`
  position: fixed;
  flex-shrink: 0;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
  max-width: 100vw;
  max-height: 100vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto
  `
}

export default styles;