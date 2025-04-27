import './Resources.css';


export default function Resources() {
   return (
       <> 
           <h1 className="resources-title ">Extra Resources</h1>
           <div className="header-img">
               <img src={"https://dbcf.ms.gov/wp-content/uploads/2020/06/financial-literacy-accent-graphic.png"} />
           </div>
           <div className="resource-link" >
               <a href="https://www.emich.edu/human-resources/documents/your-personal-financial-organizer.pdf" target="_blank" rel="noopener noreferrer">
                   Your fiscal fitness review
               </a>
           </div>
           <div className="resource-link" >
               <a href="https://www.sautech.edu/docs/studentResources/40MoneyManagementTips.pdf" target="_blank" rel="noopener noreferrer">
                   40 Money Management Tips
               </a>
           </div>
           <div className="resource-link" >
               <a href="https://www.citigroup.com/rcs/citigpa/storage/public/CitiMoneyManagement101.pdf" target="_blank" rel="noopener noreferrer">
                   Introduction to Personal Finance
               </a>
           </div>
       </>
   );
}
