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
        .catch(e => console.error(e))
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [isVisible, userId])

  return (
    <>
      {userInfo &&
        <Modal
          centered
          show={isVisible}
          onHide={onHide}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <i className="bi bi-person-fill text-primary"/>
              User info
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {!isLoading &&
              <Container>
                <Row>
                  <Col md={'auto'}>
                    <Image src={userInfo.avatar} height={'200px'} width={'200px'} alt={'avatar'} />
                  </Col>
                  <Col>
                    <p>
                      <span className={''}>
                        NAME:
                      </span>
                      {' '}{userInfo.first_name} {userInfo.last_name}
                    </p>
                    <p>EMAIL: {userInfo.email}</p>
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