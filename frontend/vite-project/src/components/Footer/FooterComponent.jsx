import React from 'react';
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css'; 
import "./FooterComponent.css"

const FooterComponent = () => {
  return (
    <Footer className='footer'
      columns={[
       
        
      ]}
      bottom="Made with ❤️ by Shaik Yaseen"
    />
  );
};

export default FooterComponent;
