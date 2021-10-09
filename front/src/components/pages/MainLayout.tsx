import React, {ReactNode} from "react";
import {Layout} from "antd";

const { Header, Content, Sider } = Layout;

interface Props {
  /** Содержимое боковой панели */
  sidebarContent: ReactNode;
  /** Ширина боковой панели */
  sideWidth: number;
}

const MainLayout: React.FC<Props> = (props) => {

  const { sidebarContent, children, sideWidth } = props;

    return (
      <Layout className={'full-height'}>
        <Header style={{ backgroundColor: '#273241' }} />
        <Layout>
          <Sider width={sideWidth} theme={"light"}>
            {sidebarContent}
          </Sider>
          <Content>
            {children}
          </Content>
        </Layout>
      </Layout>
    )
}

export default MainLayout;
