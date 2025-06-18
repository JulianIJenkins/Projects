export default function About() {
    return (
        <div>
            
            <p class="subtitle" style= {{
                position: 'fixed',
                top: '100px',
                left: '50%',
                transform: 'translateX(-50%)'
            }}
            >Contact Us</p>

            <p style={{
                fontSize: '26px',
                position: 'absolute',
                top: '180px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                maxWidth: '2000px'
            }}>Email:
            <br/>
            jetjulian68@gmail.com
            </p>

            <p class="subtitle" style= {{
                position: 'fixed',
                top: '260px',
                left: '50%',
                transform: 'translateX(-50%)'
            }}
            >Disclaimer</p>

            <p style={{
                fontSize: '26px',
                position: 'absolute',
                top: '340px',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                width: '900px'
            }}>All data is sourced from public federal databases and is for informational use only.
            Additionally, this website currently uses data from FDIC insured companies
            in the year 2020.
            </p>


        </div>
    );
  }