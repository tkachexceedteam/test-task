import {useEffect, useState} from "react";
import {getListUsers} from "../api";
import NamesList from "../components/NamesList";
import UserInfoModal from "./UserInfoModal";
import Paginator from "../components/Paginator";
import {Container} from "react-bootstrap";

const UserList = () => {
  const [userListFetchedData, setUserListFetchedData] = useState()
  const [userInfo, setUserInfo] = useState(null)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(4)
  const [userInfoModalIsVisible, setUserInfoModalIsVisible] = useState(false)

  const hideUserinfoModal = () => {
    setUserInfoModalIsVisible(false)
  }

  const onPageChange = (e) => {
    setPage(e.page)
    setPageSize(e.pageSize)
  }

  useEffect(() => {
    getListUsers(page, pageSize)
      .then(res => {
        setUserListFetchedData(res)
      })
      .catch(e => console.error(e))
  },[page, pageSize])

  const userTemplate = (userData) => {
    const onUserClick = () => {
      setUserInfo(userData)
      setUserInfoModalIsVisible(true)
    }

    return (
      <div onClick={onUserClick}>
        {userData.first_name} {userData.last_name}
      </div>)
  }

  return (
    <>
      {userListFetchedData &&
        <Container className={'col-lg-6'}>
          <h1>
            <i className="bi bi-people-fill text-primary"/> User list
          </h1>
          <NamesList items={userListFetchedData.data} template={userTemplate}/>
          <br />
          <Paginator
            page={page}
            onChange={onPageChange}
            pageSize={pageSize}
            totalPages={userListFetchedData.total_pages}
          />
        </Container>
      }
      {userInfo &&
        <UserInfoModal
          userId={userInfo.id}
          isVisible={userInfoModalIsVisible}
          onHide={hideUserinfoModal}
        />
      }
    </>
  )
}

export default UserList