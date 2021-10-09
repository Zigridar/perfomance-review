import React, { ReactNode, useState } from "react";
import CustomTable from "../Table";
import FormForm from "../FormForm";
import { IForm } from "../../../../src/common_types/interfaces/Form";
import { ReviewType, ATTESTATION, AROUND } from "../../../../src/common_types/interfaces/Review";
import { IReviewTag, getReviewTag } from "../../constants/ReviewTags";
import { Menu, Tabs, Tag, Layout } from "antd";

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

const columns = [
  {
    dataIndex: 'number',
    key: 'number',
    width: '5%',
    title: '№',
  },
  {
    dataIndex: 'name',
    key: 'name',
    width: '40%',
    title: 'Название',
  },
  {
    dataIndex: 'date',
    key: 'date',
    width: '20%',
    title: 'Дата',

  },
  {
    dataIndex: 'tags',
    key: 'tags',
    width: '30%',
    title: 'Разделы',
    render: (tags: Array<IReviewTag>) => (
      <>
        {tags.map((tag: IReviewTag) => (
          <Tag key={tag.type} color={tag.color}>{tag.title}</Tag>
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
    tags: [ATTESTATION, AROUND].map((type: ReviewType) => getReviewTag(type)),
  },
  {
    key: '2',
    number: '2',
    name: 'Вопрос 2',
    date: '22.10.2021',
    // todo
    tags: [AROUND].map((type: ReviewType) => getReviewTag(type)),
  },
];


const MainPage: React.FC = () => {

  const [current, setCurrent] = useState<number>(0);

  //todo
  const menuItems = [
    {
      title: 'Анкеты',
      content: 
        <Layout.Content className="table-wrapper"  style={{
          margin: 24,
          borderRadius: 3,
        }}>
          <CustomTable loading={true} columns={columns} dataSource={dataSource} />
        </Layout.Content>
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
