import React, {ReactNode, useState} from "react";
import MainLayout from "./MainLayout";
import {Menu, Tabs} from "antd";
import FormForm from "../FormForm";

const {TabPane} = Tabs

interface MenuProps {
  onMenuClick: (index: number) => void;
  current: string;
  menuItems: { title: string, content: ReactNode }[];
}

const MainMenu: React.FC<MenuProps> = (props) => {

  const {menuItems, onMenuClick, current} = props

  return (
    <Menu
      activeKey={current}
    >
      {menuItems.map((item, index) => {
        return (
          <Menu.Item
            key={index.toString()}
            onClick={() => onMenuClick(index)}
          >
            {item.title}
          </Menu.Item>
        )
      })}
    </Menu>
  )
}

const MainPage: React.FC = () => {

  const [current, setCurrent] = useState<number>(0);

  //todo
  const menuItems = [
    {
      title: 'Анкеты',
      content: <FormForm/>
    },
    {
      title: 'Вопросы',
      content: 'Вопросы'
    },
    {
      title: 'Администрирование',
      content: 'Администрирование'
    }
  ]

  const onMenuClick = (index: number) => setCurrent(index)

  return (
    <MainLayout
      sideWidth={400}
      sidebarContent={<MainMenu
        current={current.toString()}
        onMenuClick={onMenuClick}
        menuItems={menuItems}
      />}>
      <Tabs
        renderTabBar={null}
        activeKey={current.toString()}
      >
        {menuItems.map((item, index) => {
          return (
            <TabPane key={index.toString()}>{item.content}</TabPane>
          )
        })}
      </Tabs>
    </MainLayout>
  )
}

export default MainPage;
