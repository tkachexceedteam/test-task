import {Col, Container, Image, Modal, Row} from "react-bootstrap";
import {useEffect, useState} from "react";
import {getSingleUser} from "../api";

const UserInfoModal = ({userId, onHide, isVisible}) => {
  const [userInfo, setUserInfo] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (isVisible) {
      setIsLoading(true)
      getSingleUser(userId)
        .then(res => {
          setUserInfo(res.data)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isVisible])

  return (
    <>
      {userInfo &&
        <Modal centered show={isVisible} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>User info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!isLoading &&
              <Container>
                <Row>
                  <Col md={'auto'}>
                    <Image src={userInfo.avatar} height={'100px'} width={'100px'} alt={'avatar'} />
                  </Col>
                  <Col>
                    <Row>Name: {userInfo.first_name} {userInfo.last_name}</Row>
                    <Row>email: {userInfo.email}</Row>
                </Col>
                </Row>
              </Container>
            }
            {isLoading &&
              'Loading...'
            }
          </Modal.Body>
        </Modal>
      }
    </>
  );
}

export default UserInfoModal