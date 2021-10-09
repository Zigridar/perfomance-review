import React, { ReactNode, useState } from "react";
import MainLayout from "./MainLayout";
import CustomTable from "../Table";
import { IForm } from "../../../../src/common_types/interfaces/Form";
import { ReviewType, ATTESTATION, AROUND } from "../../../../src/common_types/interfaces/Review";
import { IReviewTag, getReviewTag } from "../../constants/ReviewTags";
import { Menu, Tabs, Tag } from "antd";

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
      content: 'Анкеты'
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

  const columns = [
    {
      dataIndex: 'number',
      width: '5%',
      title: '№',
    },
    {
      dataIndex: 'name',
      width: '40%',
      title: 'Название',
    },
    {
      dataIndex: 'date',
      width: '20%',
      title: 'Дата',

    },
    {
      dataIndex: 'reviews',
      width: '30%',
      title: 'Разделы',
      render: (reviews: Array<IReviewTag>) => (
        <>
          {reviews.map((review: IReviewTag) => (
            <Tag color={review.color}>{review.title}</Tag>
          ))}
        </>
      )
    },
  ];


  // todo
  const dataSource = [
    {
      key: '1',
      number: '1',
      name: 'Вопрос 1',
      date: '21.10.2021',
      // todo
      themes: [ATTESTATION, AROUND].map((type: ReviewType) => getReviewTag(type)),
    },
    {
      key: '2',
      number: '2',
      name: 'Вопрос 2',
      date: '22.10.2021',
      // todo
      themes: [AROUND].map((type: ReviewType) => getReviewTag(type)),
    },
  ];


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
      <div>
        <CustomTable loading={true} columns={columns} dataSource={dataSource} />
      </div>
    </MainLayout>
  )
}

export default MainPage;
