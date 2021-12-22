import {useEffect, useState} from "react";
import {getListUsers} from "../api";
import NamesList from "../components/NamesList";
import UserInfoModal from "./UserInfoModal";

const UserList = () => {
  const [userList, setUserList] = useState([])
  const [userInfo, setUserInfo] = useState(null)
  const [userInfoModalIsVisible, setUserInfoModalIsVisible] = useState(false)

  const hideUserinfoModal = () => {
    setUserInfoModalIsVisible(false)
  }

  useEffect(() => {
    getListUsers(2)
      .then(res => {
        setUserList(res.data)
      })
  },[])

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
      {userList &&
        <NamesList items={userList} template={userTemplate}/>
      }
      <UserInfoModal
        userId={userInfo?.id}
        isVisible={userInfoModalIsVisible}
        onHide={hideUserinfoModal}
      />
    </>
  )
}

export default UserList