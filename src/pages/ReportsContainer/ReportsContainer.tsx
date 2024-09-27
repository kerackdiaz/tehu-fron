import React, { useRef } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import LineChart from '../../components/atoms/LineChart/LineChart';
import TemperatureHistogram from '../../components/atoms/TemperatureHistogram/TemperatureHistogram';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';
import html2canvas from 'html2canvas';




interface jsPDFWithAutoTable extends jsPDF {
  autoTable: (options: UserOptions) => jsPDF;
}

const ReportsContainer : React.FC = () => {

  // interface jsPDFWithAutoTable extends jsPDF {
  //   autoTable: typeof autoTable;
  // }

  const lineChartRef = useRef<HTMLDivElement>(null);
  // const histogramRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);


  const devices =
  {
    id: 1,
    name: 'Bogota',
    status: 'Activo',
    temp: 21,
    type: 'Mobile',
    company: 'Laboratorio Los Aromos',
    online: true,
    origin: 'Caleñas Club, Calle 10, Pan Americano, Cali, Valle del Cauca, Colombia',
    destination: 'Bosa, Bogota, Colombia',
    batery: '95',
  }


  const data = {
    labels: ['07:00:00', '07:30:00', '08:00:00', '08:30:00', '09:00:00', '09:30:00', '10:00:00'],
    datasets: [
      {
        data: [34, 27, 26, 24, 23, 17, 22],
        backgroundColor: ["orange"],
        borderColor: ["orange"],
        borderWidth: 2,
        pointRadius: 2,
        tension: 0.1
      },
    ],

  };

  const dataHistogram = {
    day: {
      labels: ['00:00', '06:00', '12:00', '18:00'],
      temperatures: [15, 18, 21, 19],
      // locations: [3, 3, 3, 3], // Cantidad de veces que cambió de ubicación en ese período
    },
    week: {
      labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      temperatures: [17, 19, 20, 22, 21, 18, 16],
      // locations: [2, 1, 4, 3, 2, 1, 2],
    },
    month: {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      temperatures: [18, 19, 21, 20],
      // locations: [5, 3, 6, 4],
    },
    year: {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      temperatures: [16, 17, 19, 21, 23, 25, 24, 22, 20, 18, 17, 15],
      // locations: [12, 14, 16, 18, 10, 8, 7, 9, 10, 8, 6, 5],
    },
  };


  


  const downloadPDF = async () => {


    const pdf = new jsPDF('p', 'mm', 'a4') as jsPDFWithAutoTable;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 10;

    const logoUrl = "/logo.png";
    

    

    // Texto centrado
    const addCenteredText = (text: string, y: number) => {
      const textWidth = pdf.getStringUnitWidth(text) * 12 / pdf.internal.scaleFactor;
      const textOffset = (pageWidth - textWidth) / 2;
      pdf.text(text, textOffset + 20, y);
    };

    // Medidas logo
    const logoWidth = 20; 
    const logoHeight = 10;
    pdf.addImage(logoUrl, 'PNG', margin, 10, logoWidth, logoHeight);


    // Título
    pdf.setFontSize(14);
    addCenteredText(`Informe del Dispositivo: ${devices.name}`, 16);

    // Tabla de datos del dispositivo
    pdf.setFontSize(12);
    pdf.setTextColor(100);
    const table1Data = [
      ['Nombre', 'Estado', 'Encendido', 'Origen', 'Destino'],
      [devices.name, devices.status, devices.online ? 'Online' : 'Offline', devices.origin, devices.destination]
    ];

    pdf.autoTable({
      startY: 30,
      head: [table1Data[0]],
      body: [table1Data[1]],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      margin: { top: 30, right: margin, bottom: 0, left: margin },
    });

    const table2Data = [
      ['Temperatura Actual', 'Tipo', 'Empresa', 'Batería'],
      [`${devices.temp} °C`, devices.type, devices.company, `${devices.batery}%`]
    ];
  
    
    const secondTableStartY = (pdf as any).lastAutoTable.finalY + 10;

    pdf.autoTable({
      startY: secondTableStartY,
      head: [table2Data[0]],
      body: [table2Data[1]],
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      margin: { top: 30, right: margin, bottom: 0, left: margin },
    });



    // Gráfico de temperatura
    if (lineChartRef.current) {
      const lineChartCanvas = await html2canvas(lineChartRef.current);
      const lineChartImgData = lineChartCanvas.toDataURL('image/png');
      pdf.addImage(lineChartImgData, 'PNG', margin, 80, pageWidth - 2 * margin, 60);
    }

    // Histograma
    if (chartRef.current) {
      const histogramCanvas = await html2canvas(chartRef.current);
      const histogramImgData = histogramCanvas.toDataURL('image/png');
      pdf.addImage(histogramImgData, 'PNG', margin, 150, pageWidth - 2 * margin, 60);
    }


    // Pie de página
    const footerText = `Informe empresa: ${devices.company}`;
    pdf.setFontSize(10);
    pdf.text(footerText, margin, pageHeight - 10);

    

    pdf.save('reporte-dispositivo.pdf');
  };



  return (
    <>
      <div className="flex h-screen lg:mt-[64px]">
        <div className="w-full">
          <div className="flex flex-col items-center justify-between bg-gray-200 py-4 md:flex-row md:px-16">
            <button className="rounded-full bg-blueDark2 border border-blueDark font-semibold text-white h-10 px-4 cursor-pointer transition-all duration-300  hover:bg-whiteLight hover:text-blueDark" onClick={downloadPDF}>Descargar informe</button>
          </div>

          <div id="report-content">

            <div className="p-4 overflow-x-auto md:p-6">
              <table className="w-full text-left">
                <thead className='text-blueLight font-semibold bg-blueLight4 text-xs text-center h-10'>
                  <tr>
                    <th className='min-w-[200px] border-r border-whiteLight rounded-tl-lg px-2 py-2'><span>Nombre Dispositivo</span></th>
                    <th className='min-w-[130px] border-r border-whiteLight px-2 py-2'><span>Estado</span></th>
                    <th className='min-w-[100px] border-r border-whiteLight px-2 py-2'><span>Encendido</span></th>
                    <th className='min-w-[200px] border-r border-whiteLight px-2 py-2 text-left'><span>Origen</span></th>
                    <th className='min-w-[200px] rounded-tr-lg  border-r border-whiteLight px-2 py-2 text-left'><span>Destino</span></th>
                  </tr>
                </thead>

                <tbody className='font-semibold bg-gray-200 text-xs text-center h-10'>
                  <tr >
                    <td className='border-r border-whiteLight px-2 py-2'><span >{devices?.name}</span></td>
                    <td className='border-r border-whiteLight px-2 py-2'><span>{devices?.status}</span></td>
                    <td className={`${devices?.online == true ? 'text-green-500' : 'text-red-500'} border-r border-whiteLight px-2 py-2`}><span>{devices?.online === true ? 'Online' : 'Offline'}</span></td>
                    <td className='border-r border-whiteLight text-left px-2 py-2'><span>{devices?.origin}</span></td>
                    <td className='border-r border-whiteLight text-left px-2 py-2'><span>{devices?.destination}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>



            <div className='flex flex-wrap gap-x-10 justify-center'>
              <div className='flex justify-center items-center mt-6 relative h-[300px] w-[350px]'>
                <h1 className='absolute text-xs font-semibold top-[-10px]'>Temperatura Actual</h1>
                <div className='flex justify-center items-center rounded-full size-[120px]' style={{ boxShadow: '0 0 10px 2px rgba(153, 213, 232, 91)' }}>
                  <p className='text-3xl font-semibold text-blueDark'>{devices?.temp} °C</p>
                </div>

                <div className='flex justify-center items-center size-[190px] absolute'>
                  <CircularProgressbar value={devices?.temp} minValue={0} maxValue={40} strokeWidth={6}
                    styles={{
                      // Customize the root svg elementF
                      root: {},
                      // Customize the path, i.e. the "completed progress"
                      path: {
                        // Path color
                        stroke: `rgba(54, 131, 181, ${(devices?.temp) / 40})`,
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Customize transition animation
                        transition: 'stroke-dashoffset 0.5s ease 0s',
                        // Rotate the path
                        transform: 'rotate(0.50turn)',
                        transformOrigin: 'center center',
                      },
                      // Customize the circle behind the path, i.e. the "total progress"
                      trail: {
                        // Trail color
                        stroke: 'transparent',
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'round',
                        // Rotate the trail
                        transform: 'rotate(0.50turn)',
                        transformOrigin: 'center center',
                      },
                      // Customize the text
                      text: {
                        // Text color
                        fill: '#f88',
                        // Text size
                        fontSize: '16px',
                      },
                      // Customize background - only used when the `background` prop is true
                      background: {
                        fill: '#3e98c7',
                      },
                    }}

                  />
                </div>

                <div className='absolute flex justify-center items-center size-[180px] mr-[6px] mb-[6px]'>
                  <div className="relative w-full h-full">
                    {[...Array(40)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute left-1/2 top-1/2 transform origin-bottom"
                        style={{ transform: `rotate(${i * 9}deg) translateX(-50%) translateY(-110px)` }}
                      >
                        <div className="w-1 h-1 bg-blueDark rounded-full"></div>
                      </div>
                    ))}

                  </div>
                  <p className='absolute bottom-[-52px] text-[9px]'>0 °C</p>
                  <p className='absolute left-[-50px] text-[9px]'>10 °C</p>
                  <p className='absolute top-[-44px] text-[9px]'>20 °C</p>
                  <p className='absolute right-[-55px] text-[9px]'>30 °C</p>

                </div>
              </div>

              <div className='flex flex-col gap-6 bg-blueLight3 rounded-xl shadow-md h-[240px] w-[300px] px-4 py-2 mt-12'>
                <div className='flex gap-4'>
                  <img src="/icon-device.avif" alt="Imagen de dispositivo" className='w-12 h-16' />
                  <div className='mt-4'>
                    <p className='text-sm'>Tipo de dispositivo</p>
                    <p className='font-semibold'>{devices?.type}</p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <img src="/icon-entity.avif" alt="Imagen de empresa" className='w-12 h-12' />
                  <div>
                    <p className='text-sm'>Empresa</p>
                    <p className='font-semibold'>{devices?.company}</p>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <img src="/Batery-Icon.avif" alt="Imagen de batería" className='w-12 h-12' />
                  <div>
                    <p className='text-sm'>Batería</p>
                    <p className='font-semibold'>{devices?.batery} %</p>
                  </div>
                </div>
              </div>

              <div className="w-full h-[350px] mt-10 px-2 md:px-10 xl:px-8">
                <TemperatureHistogram data={dataHistogram} chartRef={chartRef}/>
              </div>

              <div className="w-full mt-24 px-2 md:px-10 xl:px-8 mb-20" ref={lineChartRef}>
                <LineChart data={data} />
              </div>

            </div>
          </div>

        </div>




      </div>
    </>
  )
}

export { ReportsContainer }